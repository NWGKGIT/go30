import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { go30Path, type PathDefinition } from '../content/paths/go30';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as never);

/**
 * Validate the path definition before syncing
 */
function validatePath(path: PathDefinition): void {
  const errors: string[] = [];

  // Check day slugs are unique
  const daySlugs = new Set<string>();
  for (const day of path.days) {
    if (daySlugs.has(day.slug)) {
      errors.push(`Duplicate day slug: ${day.slug}`);
    }
    daySlugs.add(day.slug);

    // Check task slugs are unique within day
    const taskSlugs = new Set<string>();
    for (const task of day.tasks) {
      if (taskSlugs.has(task.slug)) {
        errors.push(`Duplicate task slug in ${day.slug}: ${task.slug}`);
      }
      taskSlugs.add(task.slug);
    }
  }

  // Check dayNumbers are contiguous 1..N
  const dayNumbers = path.days.map(d => d.dayNumber).sort((a, b) => a - b);
  for (let i = 0; i < dayNumbers.length; i++) {
    if (dayNumbers[i] !== i + 1) {
      errors.push(`Day numbers must be contiguous 1..N, found gap at ${i + 1}`);
      break;
    }
  }

  // Check phases reference valid days
  for (const phase of path.phases) {
    const [start, end] = phase.dayRange;
    if (start < 1 || end > path.days.length || start > end) {
      errors.push(`Invalid phase ${phase.number} dayRange: [${start}, ${end}]`);
    }
  }

  // Check milestones reference valid days
  for (const milestone of path.milestones) {
    if (milestone.dayNumber < 1 || milestone.dayNumber > path.days.length) {
      errors.push(`Invalid milestone dayNumber: ${milestone.dayNumber}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Path validation failed:\n  - ${errors.join('\n  - ')}`);
  }
}

/**
 * Sync the path to the database
 */
async function syncPath(path: PathDefinition): Promise<void> {
  console.log(`🔄 Syncing path: ${path.title} (${path.slug} v${path.version})`);

  validatePath(path);

  await prisma.$transaction(async (tx) => {
    // Upsert Path
    await tx.path.upsert({
      where: { slug: path.slug },
      update: {
        version: path.version,
        title: path.title,
        description: path.description,
      },
      create: {
        slug: path.slug,
        version: path.version,
        title: path.title,
        description: path.description,
      },
    });

    // Upsert days
    for (let i = 0; i < path.days.length; i++) {
      const day = path.days[i];
      const existing = await tx.curriculumDay.findUnique({
        where: {
          pathSlug_slug: {
            pathSlug: path.slug,
            slug: day.slug,
          },
        },
      });

      if (existing) {
        await tx.curriculumDay.update({
          where: { id: existing.id },
          data: {
            dayNumber: day.dayNumber,
            phase: day.phase,
            week: day.week,
            title: day.title,
            description: day.description,
            xpReward: day.xpReward,
            sortOrder: i,
          },
        });
      } else {
        await tx.curriculumDay.create({
          data: {
            pathSlug: path.slug,
            slug: day.slug,
            dayNumber: day.dayNumber,
            phase: day.phase,
            week: day.week,
            title: day.title,
            description: day.description,
            xpReward: day.xpReward,
            sortOrder: i,
          },
        });
      }

      // Upsert tasks for this day
      const dayRecord = await tx.curriculumDay.findUniqueOrThrow({
        where: {
          pathSlug_slug: {
            pathSlug: path.slug,
            slug: day.slug,
          },
        },
      });

      for (let j = 0; j < day.tasks.length; j++) {
        const task = day.tasks[j];
        const existingTask = await tx.task.findUnique({
          where: {
            dayId_slug: {
              dayId: dayRecord.id,
              slug: task.slug,
            },
          },
        });

        if (existingTask) {
          await tx.task.update({
            where: { id: existingTask.id },
            data: {
              label: task.label,
              type: task.type,
              url: task.url ?? null,
              sortOrder: j,
            },
          });
        } else {
          await tx.task.create({
            data: {
              dayId: dayRecord.id,
              slug: task.slug,
              label: task.label,
              type: task.type,
              url: task.url ?? null,
              sortOrder: j,
            },
          });
        }
      }

      // Remove tasks that are no longer in the path
      const currentTaskSlugs = day.tasks.map(t => t.slug);
      const orphanedTasks = await tx.task.findMany({
        where: {
          dayId: dayRecord.id,
          slug: { notIn: currentTaskSlugs },
        },
        include: {
          completions: true,
        },
      });

      if (orphanedTasks.length > 0) {
        console.warn(
          `⚠️  Removing ${orphanedTasks.length} orphaned task(s) from ${day.slug}:`
        );
        for (const orphan of orphanedTasks) {
          console.warn(
            `   - ${orphan.slug} (${orphan.completions.length} completion(s) will be deleted)`
          );
        }
        await tx.task.deleteMany({
          where: {
            id: { in: orphanedTasks.map(t => t.id) },
          },
        });
      }

      process.stdout.write(`  ✓ Day ${day.dayNumber}: ${day.title}\n`);
    }

    // Remove days that are no longer in the path
    const currentDaySlugs = path.days.map(d => d.slug);
    const orphanedDays = await tx.curriculumDay.findMany({
      where: {
        pathSlug: path.slug,
        slug: { notIn: currentDaySlugs },
      },
      include: {
        progress: true,
      },
    });

    if (orphanedDays.length > 0) {
      console.warn(
        `⚠️  Removing ${orphanedDays.length} orphaned day(s) from path:`
      );
      for (const orphan of orphanedDays) {
        console.warn(
          `   - ${orphan.slug} (${orphan.progress.length} user progress record(s) will be deleted)`
        );
      }
      await tx.curriculumDay.deleteMany({
        where: {
          id: { in: orphanedDays.map(d => d.id) },
        },
      });
    }
  });

  console.log(`\n✅ Sync complete — ${path.days.length} days loaded.`);
  console.log(
    `\nNote: DayProgress records are created automatically on first login via ensureDayProgressRecords().`
  );
}

async function main() {
  try {
    await syncPath(go30Path);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
