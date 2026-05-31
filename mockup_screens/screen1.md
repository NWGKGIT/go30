<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Go 30 Days - Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;family=JetBrains+Mono:wght@400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-variant": "#e2e2e2",
                      "surface-tint": "#5f5e5e",
                      "inverse-surface": "#2f3130",
                      "secondary-container": "#316bf3",
                      "on-primary-fixed": "#1c1b1b",
                      "surface": "#f9f9f8",
                      "on-primary-fixed-variant": "#474646",
                      "on-tertiary-container": "#9863ff",
                      "on-primary-container": "#858383",
                      "outline": "#747878",
                      "primary-fixed-dim": "#c8c6c5",
                      "tertiary-fixed-dim": "#d2bbff",
                      "error-container": "#ffdad6",
                      "background": "#f9f9f8",
                      "on-surface-variant": "#444748",
                      "tertiary-container": "#25005a",
                      "primary-container": "#1c1b1b",
                      "secondary": "#0051d5",
                      "on-surface": "#1a1c1c",
                      "surface-container-low": "#f4f4f3",
                      "on-secondary-fixed-variant": "#003ea8",
                      "surface-container-highest": "#e2e2e2",
                      "on-tertiary": "#ffffff",
                      "on-primary": "#ffffff",
                      "on-tertiary-fixed": "#25005a",
                      "surface-container": "#eeeeed",
                      "primary-fixed": "#e5e2e1",
                      "on-secondary-container": "#fefcff",
                      "surface-container-high": "#e8e8e7",
                      "tertiary": "#000000",
                      "on-secondary-fixed": "#00174b",
                      "on-secondary": "#ffffff",
                      "outline-variant": "#c4c7c7",
                      "surface-dim": "#dadad9",
                      "secondary-fixed-dim": "#b4c5ff",
                      "on-tertiary-fixed-variant": "#5a00c6",
                      "on-error-container": "#93000a",
                      "primary": "#000000",
                      "on-background": "#1a1c1c",
                      "surface-bright": "#f9f9f8",
                      "error": "#ba1a1a",
                      "surface-container-lowest": "#ffffff",
                      "on-error": "#ffffff",
                      "secondary-fixed": "#dbe1ff",
                      "tertiary-fixed": "#eaddff",
                      "inverse-primary": "#c8c6c5",
                      "inverse-on-surface": "#f1f1f0"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "base": "4px",
                      "stack-md": "16px",
                      "gutter": "24px",
                      "stack-sm": "8px",
                      "container-max": "1200px",
                      "margin-mobile": "16px",
                      "stack-lg": "32px"
              },
              "fontFamily": {
                      "h2": ["Inter"],
                      "code": ["JetBrains Mono"],
                      "h1": ["Inter"],
                      "body": ["Inter"],
                      "label": ["Inter"],
                      "h3": ["Inter"],
                      "body-medium": ["Inter"]
              },
              "fontSize": {
                      "h2": ["20px", {"lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "code": ["13px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "h1": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "body": ["14px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}],
                      "label": ["12px", {"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                      "h3": ["18px", {"lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                      "body-medium": ["14px", {"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "500"}]
              }
            }
          }
        }
    </script>
<style>
        .task-checkbox:checked + div .checkmark {
            transform: scale(1);
            opacity: 1;
        }
        .task-checkbox:not(:checked) + div .checkmark {
            transform: scale(0);
            opacity: 0;
        }
        .task-checkbox:checked + div {
            background-color: #111111;
            border-color: #111111;
        }
        .task-checkbox:focus-visible + div {
            outline: 2px solid #0051d5;
            outline-offset: 2px;
        }
        .checkmark {
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .progress-bar-fill {
            transition: width 0.3s ease-out;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body antialiased flex min-h-screen">
<!-- TopAppBar for Mobile -->
<header class="md:hidden docked full-width top-0 border-b border-outline-variant bg-background flex justify-between items-center h-16 px-gutter max-w-[900px] mx-auto w-full z-50 fixed">
<div class="font-h1 text-h1 font-black text-primary">go30</div>
<button class="p-2 hover:bg-surface-container-high transition-colors rounded">
<span class="material-symbols-outlined text-primary">calendar_today</span>
</button>
</header>
<!-- SideNavBar (Desktop) -->
<nav class="hidden md:flex bg-surface-container-low fixed left-0 top-0 h-full w-[240px] border-r border-outline-variant flex-col justify-between py-stack-lg z-40">
<div>
<div class="px-stack-lg mb-stack-lg">
<div class="font-h1 text-h1 font-black text-primary">go30</div>
<div class="font-label text-label text-on-surface-variant mt-base">Learning Tracker</div>
</div>
<ul class="space-y-base px-stack-sm">
<li>
<a class="flex items-center gap-stack-sm px-stack-sm py-2 rounded text-secondary border-l-2 border-secondary bg-surface-container transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span class="font-body-medium text-body-medium">Dashboard</span>
</a>
</li>
<li>
<a class="flex items-center gap-stack-sm px-stack-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out border-l-2 border-transparent" href="#">
<span class="material-symbols-outlined">map</span>
<span class="font-body-medium text-body-medium">Roadmap</span>
</a>
</li>
<li>
<a class="flex items-center gap-stack-sm px-stack-sm py-2 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out border-l-2 border-transparent" href="#">
<span class="material-symbols-outlined">edit_note</span>
<span class="font-body-medium text-body-medium">Journal</span>
</a>
</li>
</ul>
</div>
<div class="px-stack-sm">
<div class="border-t border-outline-variant pt-stack-sm space-y-base mb-stack-lg">
<div class="flex items-center gap-stack-sm px-stack-sm py-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[#EA580C]">local_fire_department</span>
<span class="font-label text-label">Streak: 12 Days</span>
</div>
<div class="flex items-center gap-stack-sm px-stack-sm py-1 text-on-surface-variant">
<span class="material-symbols-outlined text-[#9333EA]">military_tech</span>
<span class="font-label text-label">4,250 XP</span>
</div>
</div>
<button class="w-full flex items-center justify-center gap-2 py-2 border border-outline-variant rounded font-body-medium text-body-medium hover:bg-surface-container-high transition-colors text-on-surface">
                Logout
            </button>
</div>
</nav>
<!-- Main Content -->
<main class="flex-1 w-full md:pl-[240px] pt-16 md:pt-0 pb-20 md:pb-0">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg grid grid-cols-1 gap-stack-lg">
<!-- Top Section: Today's Work -->
<section class="bg-surface rounded-xl border border-outline-variant p-stack-md md:p-gutter">
<div class="flex flex-col md:flex-row justify-between md:items-start gap-stack-md border-b border-outline-variant pb-stack-md mb-stack-md">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="font-label text-label uppercase tracking-widest text-on-surface-variant">Day 1</span>
<span class="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
<span class="font-label text-label text-on-surface-variant">Syntax sprint</span>
</div>
<h2 class="font-h2 text-h2 text-primary">Tooling + hello world + types</h2>
</div>
<div class="w-full md:w-48">
<div class="flex justify-between font-label text-label mb-2">
<span class="text-on-surface-variant">Progress</span>
<span class="text-primary font-medium" id="progress-text">0/3</span>
</div>
<div class="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-[#2563EB] progress-bar-fill w-0" id="progress-bar"></div>
</div>
</div>
</div>
<div class="space-y-stack-sm">
<!-- Task 1 -->
<label class="flex items-start gap-stack-sm p-stack-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group border border-transparent hover:border-outline-variant">
<div class="relative flex items-center justify-center mt-1">
<input class="sr-only task-checkbox" onchange="updateProgress()" type="checkbox"/>
<div class="w-5 h-5 rounded border border-outline bg-white flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-white text-[16px] checkmark" style="font-variation-settings: 'FILL' 1;">check</span>
</div>
</div>
<div class="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
<span class="font-body-medium text-body-medium text-primary group-hover:text-primary transition-colors">Go Tour: Basics 1–13</span>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#DCFCE7] text-[#166534]">Tour</span>
<a class="text-on-surface-variant hover:text-secondary p-1" href="https://go.dev/tour" onclick="event.stopPropagation()" target="_blank">
<span class="material-symbols-outlined text-[18px]">open_in_new</span>
</a>
</div>
</div>
</label>
<!-- Task 2 -->
<label class="flex items-start gap-stack-sm p-stack-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group border border-transparent hover:border-outline-variant">
<div class="relative flex items-center justify-center mt-1">
<input class="sr-only task-checkbox" onchange="updateProgress()" type="checkbox"/>
<div class="w-5 h-5 rounded border border-outline bg-white flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-white text-[16px] checkmark" style="font-variation-settings: 'FILL' 1;">check</span>
</div>
</div>
<div class="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
<span class="font-body-medium text-body-medium text-primary">TGPL ch.1–2</span>
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F3E8FF] text-[#6B21A8]">Book</span>
</div>
</label>
<!-- Task 3 -->
<label class="flex items-start gap-stack-sm p-stack-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group border border-transparent hover:border-outline-variant">
<div class="relative flex items-center justify-center mt-1">
<input class="sr-only task-checkbox" onchange="updateProgress()" type="checkbox"/>
<div class="w-5 h-5 rounded border border-outline bg-white flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-white text-[16px] checkmark" style="font-variation-settings: 'FILL' 1;">check</span>
</div>
</div>
<div class="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
<span class="font-body-medium text-body-medium text-primary">Write: 5 small programs</span>
<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FEF3C7] text-[#B45309]">Code</span>
</div>
</label>
</div>
</section>
<!-- Middle Section: Stat Strip -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-stack-sm">
<div class="bg-surface rounded-lg border border-outline-variant p-stack-md flex flex-col justify-between">
<div class="flex items-center gap-2 text-on-surface-variant mb-2">
<span class="material-symbols-outlined text-[18px] text-[#EA580C]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
<span class="font-label text-label">Current Streak</span>
</div>
<div class="font-h1 text-h1 text-primary">12 <span class="font-body text-body text-on-surface-variant ml-1">days</span></div>
</div>
<div class="bg-surface rounded-lg border border-outline-variant p-stack-md flex flex-col justify-between">
<div class="flex items-center gap-2 text-on-surface-variant mb-2">
<span class="material-symbols-outlined text-[18px] text-[#9333EA]">military_tech</span>
<span class="font-label text-label">Total XP</span>
</div>
<div class="font-h1 text-h1 text-primary">4,250</div>
</div>
<div class="bg-surface rounded-lg border border-outline-variant p-stack-md flex flex-col justify-between">
<div class="flex items-center gap-2 text-on-surface-variant mb-2">
<span class="material-symbols-outlined text-[18px] text-[#166534]">check_circle</span>
<span class="font-label text-label">Days Complete</span>
</div>
<div class="font-h1 text-h1 text-primary">11<span class="text-on-surface-variant font-h3">/30</span></div>
</div>
<div class="bg-surface rounded-lg border border-outline-variant p-stack-md flex flex-col justify-between">
<div class="flex items-center gap-2 text-on-surface-variant mb-2">
<span class="material-symbols-outlined text-[18px]">calendar_month</span>
<span class="font-label text-label">Days Remaining</span>
</div>
<div class="font-h1 text-h1 text-primary">19</div>
</div>
</section>
<!-- Bottom Section: Calendar Grid -->
<section class="bg-surface rounded-xl border border-outline-variant p-stack-md md:p-gutter">
<h3 class="font-h3 text-h3 text-primary mb-stack-md pb-stack-sm border-b border-outline-variant">Calendar</h3>
<div class="grid grid-cols-5 md:grid-cols-10 gap-2">
<!-- Days 1-11 Complete -->
<script>
                        for(let i=1; i<=11; i++) {
                            document.write(`
                                <div class="aspect-square bg-[#DCFCE7] border border-[#22C55E] rounded flex flex-col items-center justify-center relative">
                                    <span class="font-code text-code text-[#166534] absolute top-1 left-1">${i}</span>
                                    <span class="material-symbols-outlined text-[#166534]" style="font-variation-settings: 'FILL' 1;">check</span>
                                </div>
                            `);
                        }
                    </script>
<!-- Day 12 Available -->
<div class="aspect-square bg-surface border-2 border-secondary rounded flex flex-col items-center justify-center relative shadow-[0_0_0_2px_rgba(49,107,243,0.2)]">
<span class="font-code text-code text-primary absolute top-1 left-1 font-bold">12</span>
<span class="material-symbols-outlined text-secondary animate-pulse">play_arrow</span>
</div>
<!-- Days 13-30 Locked -->
<script>
                        for(let i=13; i<=30; i++) {
                            document.write(`
                                <div class="aspect-square bg-surface-container border border-outline-variant rounded flex flex-col items-center justify-center relative opacity-60">
                                    <span class="font-code text-code text-on-surface-variant absolute top-1 left-1">${i}</span>
                                    <span class="material-symbols-outlined text-outline text-[18px]">lock</span>
                                </div>
                            `);
                        }
                    </script>
</div>
</section>
</div>
</main>
<!-- Bottom Nav for Mobile -->
<nav class="md:hidden fixed bottom-0 w-full bg-surface border-t border-outline-variant flex justify-around items-center h-16 z-50">
<a class="flex flex-col items-center justify-center w-full h-full text-secondary relative" href="#">
<div class="absolute top-0 w-1/2 h-[2px] bg-secondary rounded-b-full"></div>
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span class="font-label text-[10px] leading-none">Dashboard</span>
</a>
<a class="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined mb-1">map</span>
<span class="font-label text-[10px] leading-none">Roadmap</span>
</a>
<a class="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined mb-1">edit_note</span>
<span class="font-label text-[10px] leading-none">Journal</span>
</a>
</nav>
<script>
        function updateProgress() {
            const checkboxes = document.querySelectorAll('.task-checkbox');
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            
            const progressText = document.getElementById('progress-text');
            const progressBar = document.getElementById('progress-bar');
            
            progressText.textContent = `${checked}/${total}`;
            progressBar.style.width = `${(checked / total) * 100}%`;
        }
    </script>
</body></html>