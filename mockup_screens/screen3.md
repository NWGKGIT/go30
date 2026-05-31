<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Go 30 - Roadmap</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;family=JetBrains+Mono:wght@400&amp;display=swap" rel="stylesheet"/>
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
                        "h2": ["20px", { "lineHeight": "28px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                        "code": ["13px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "h1": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                        "body": ["14px", { "lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400" }],
                        "label": ["12px", { "lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "h3": ["18px", { "lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "body-medium": ["14px", { "lineHeight": "20px", "letterSpacing": "0", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
<style>
        /* Light mode forcing for this specific request despite class="dark" on html (following prompt instruction: "Light Mode: The page should be in light mode.") */
        :root {
            color-scheme: light;
        }
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-background');
        }
        /* Hide scrollbar for clean UI */
        ::-webkit-scrollbar {
            display: none;
        }
        
        .spring-transition {
            transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        details > summary {
            list-style: none;
        }
        details > summary::-webkit-details-marker {
            display: none;
        }
        
        details[open] .chevron {
            transform: rotate(180deg);
        }
        
        .day-row:hover .drag-handle {
            opacity: 1;
        }
    </style>
</head>
<body class="font-body text-body bg-background text-on-background flex h-screen overflow-hidden">
<!-- SideNavBar (Desktop) -->
<nav class="hidden md:flex fixed left-0 top-0 h-full w-[240px] flex-col justify-between py-stack-lg bg-surface-container-low border-r border-outline-variant z-20 transition-all duration-200 ease-in-out">
<div>
<!-- Header Brand -->
<div class="px-gutter mb-stack-lg flex items-center gap-stack-sm">
<div class="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-bold">g</div>
<div>
<h1 class="font-h2 text-h2 font-bold text-primary">go30</h1>
<p class="font-label text-label text-on-surface-variant">Learning Tracker</p>
</div>
</div>
<!-- Tabs -->
<ul class="flex flex-col px-stack-sm gap-1">
<li>
<a class="flex items-center gap-stack-sm px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body text-body font-medium" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                        Dashboard
                    </a>
</li>
<li>
<!-- Active State: Roadmap -->
<a class="flex items-center gap-stack-sm px-3 py-2 rounded-lg text-secondary border-l-2 border-secondary bg-surface-container font-body text-body font-medium transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="map">map</span>
                        Roadmap
                    </a>
</li>
<li>
<a class="flex items-center gap-stack-sm px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body text-body font-medium" href="#">
<span class="material-symbols-outlined" data-icon="edit_note">edit_note</span>
                        Journal
                    </a>
</li>
</ul>
</div>
<!-- Footer / CTA -->
<div class="px-gutter flex flex-col gap-stack-sm">
<div class="flex items-center gap-2 text-on-surface-variant font-label text-label">
<span class="material-symbols-outlined text-base" data-icon="local_fire_department">local_fire_department</span>
                Streak: 12 Days
            </div>
<div class="flex items-center gap-2 text-on-surface-variant font-label text-label">
<span class="material-symbols-outlined text-base" data-icon="military_tech">military_tech</span>
                4,250 XP
            </div>
<button class="mt-stack-sm w-full py-2 border border-outline-variant rounded-lg font-body-medium text-body-medium hover:bg-surface-container-high transition-colors">
                Logout
            </button>
</div>
</nav>
<!-- TopAppBar (Mobile) -->
<header class="md:hidden fixed top-0 w-full h-16 bg-background border-b border-outline-variant flex justify-between items-center px-gutter z-20">
<h1 class="font-h1 text-h1 font-black text-primary">go30</h1>
<button class="text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
</button>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 overflow-y-auto w-full pt-16 md:pt-0 pl-0 md:pl-[240px]">
<div class="max-w-[900px] mx-auto px-margin-mobile md:px-gutter py-stack-lg">
<!-- Page Header -->
<div class="mb-stack-lg border-b border-outline-variant pb-stack-md flex justify-between items-end">
<div>
<h2 class="font-h1 text-h1 text-primary mb-1">Curriculum Overview</h2>
<p class="font-body text-body text-on-surface-variant">Your 30-day journey to mastering Go.</p>
</div>
<div class="hidden sm:flex gap-2">
<button class="px-3 py-1.5 border border-outline-variant rounded-lg font-label text-label bg-surface hover:bg-surface-container-high transition-colors flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">collapse_all</span> Collapse All
                    </button>
</div>
</div>
<!-- Curriculum Container -->
<div class="flex flex-col gap-stack-lg pb-24">
<!-- Phase 1 -->
<details class="group bg-surface border border-outline-variant rounded-xl overflow-hidden" open="">
<summary class="cursor-pointer bg-surface-container-low px-stack-md py-3 flex justify-between items-center border-b border-outline-variant hover:bg-surface-container transition-colors select-none">
<div class="flex items-center gap-3">
<span class="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label text-label font-bold">P1</span>
<h3 class="font-h3 text-h3 text-primary">Phase 1: Syntax Sprint</h3>
</div>
<div class="flex items-center gap-4 text-on-surface-variant font-label text-label">
<span>Days 1-7</span>
<span class="material-symbols-outlined chevron transition-transform duration-200">expand_more</span>
</div>
</summary>
<div class="p-stack-md bg-surface flex flex-col gap-stack-md">
<!-- Week 1 Group -->
<div class="flex flex-col gap-2">
<h4 class="font-label text-label text-on-surface-variant uppercase tracking-wider pl-8">Week 1: Fundamentals</h4>
<!-- Day 1 -->
<div class="day-row group/row flex items-center gap-3 py-2 px-2 hover:bg-surface-container-low rounded-lg transition-colors border border-transparent hover:border-outline-variant">
<span class="material-symbols-outlined drag-handle opacity-0 transition-opacity cursor-grab text-outline-variant hover:text-on-surface-variant text-[20px]">drag_indicator</span>
<button class="w-6 h-6 rounded-full border-2 border-secondary bg-secondary text-on-secondary flex items-center justify-center spring-transition flex-shrink-0">
<span class="material-symbols-outlined text-[14px]">check</span>
</button>
<span class="font-code text-code text-on-surface-variant w-12 flex-shrink-0">Day 1</span>
<span class="font-body-medium text-body-medium text-on-surface line-through opacity-70">Hello World &amp; Basic Types</span>
<span class="ml-auto font-label text-label text-on-surface-variant px-2 py-1 bg-surface-container rounded">Completed</span>
</div>
<!-- Day 2 -->
<div class="day-row group/row flex items-center gap-3 py-2 px-2 hover:bg-surface-container-low rounded-lg transition-colors border border-transparent hover:border-outline-variant">
<span class="material-symbols-outlined drag-handle opacity-0 transition-opacity cursor-grab text-outline-variant hover:text-on-surface-variant text-[20px]">drag_indicator</span>
<button class="w-6 h-6 rounded-full border-2 border-outline-variant bg-transparent hover:border-secondary flex items-center justify-center spring-transition flex-shrink-0"></button>
<span class="font-code text-code text-on-surface-variant w-12 flex-shrink-0">Day 2</span>
<span class="font-body-medium text-body-medium text-on-surface">Variables, Constants, &amp; Scope</span>
<span class="ml-auto font-label text-label text-secondary px-2 py-1 bg-secondary-fixed rounded">Today</span>
</div>
<!-- Day 3 -->
<div class="day-row group/row flex items-center gap-3 py-2 px-2 hover:bg-surface-container-low rounded-lg transition-colors border border-transparent hover:border-outline-variant">
<span class="material-symbols-outlined drag-handle opacity-0 transition-opacity cursor-grab text-outline-variant hover:text-on-surface-variant text-[20px]">drag_indicator</span>
<button class="w-6 h-6 rounded-full border-2 border-outline-variant bg-transparent hover:border-secondary flex items-center justify-center spring-transition flex-shrink-0"></button>
<span class="font-code text-code text-on-surface-variant w-12 flex-shrink-0">Day 3</span>
<span class="font-body-medium text-body-medium text-on-surface">Control Structures (if, for, switch)</span>
</div>
</div>
</div>
</details>
<!-- Milestone Banner -->
<div class="relative overflow-hidden rounded-xl bg-surface-container-highest border border-outline-variant p-stack-md flex items-center gap-stack-md">
<div class="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
<div class="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm z-10 flex-shrink-0">
<span class="material-symbols-outlined">flag</span>
</div>
<div class="z-10">
<h4 class="font-label text-label text-on-surface-variant uppercase tracking-wider mb-1">Milestone 1</h4>
<p class="font-h3 text-h3 text-primary">CLI Task Manager</p>
</div>
<button class="ml-auto z-10 px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-medium text-body-medium hover:bg-surface-container transition-colors">
                        View Project
                    </button>
</div>
<!-- Phase 2 -->
<details class="group bg-surface border border-outline-variant rounded-xl overflow-hidden">
<summary class="cursor-pointer bg-surface-container-low px-stack-md py-3 flex justify-between items-center border-b border-outline-variant hover:bg-surface-container transition-colors select-none">
<div class="flex items-center gap-3">
<span class="w-8 h-8 rounded-full bg-surface-tint text-on-primary flex items-center justify-center font-label text-label font-bold">P2</span>
<h3 class="font-h3 text-h3 text-primary">Phase 2: Core Concepts</h3>
</div>
<div class="flex items-center gap-4 text-on-surface-variant font-label text-label">
<span>Days 8-14</span>
<span class="material-symbols-outlined chevron transition-transform duration-200">expand_more</span>
</div>
</summary>
<div class="p-stack-md bg-surface flex flex-col gap-stack-md">
<!-- Content omitted for brevity, follows same pattern -->
<p class="font-body text-body text-on-surface-variant italic pl-8">Sections unlock when Phase 1 is complete.</p>
</div>
</details>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile) - Hidden on desktop -->
<nav class="md:hidden fixed bottom-0 w-full bg-surface border-t border-outline-variant z-20 pb-safe">
<ul class="flex justify-around items-center h-16">
<li class="flex-1">
<a class="flex flex-col items-center justify-center h-full gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined text-[24px]">dashboard</span>
<span class="font-label text-[10px]">Dashboard</span>
</a>
</li>
<li class="flex-1">
<a class="flex flex-col items-center justify-center h-full gap-1 text-secondary" href="#">
<span class="material-symbols-outlined text-[24px] bg-secondary-fixed px-4 py-1 rounded-full">map</span>
<span class="font-label text-[10px] font-bold">Roadmap</span>
</a>
</li>
<li class="flex-1">
<a class="flex flex-col items-center justify-center h-full gap-1 text-on-surface-variant" href="#">
<span class="material-symbols-outlined text-[24px]">edit_note</span>
<span class="font-label text-[10px]">Journal</span>
</a>
</li>
</ul>
</nav>
<script>
        // Simple interactions for drag handles and checkboxes (visual only)
        document.querySelectorAll('.day-row button').forEach(btn => {
            btn.addEventListener('click', function() {
                const isCompleted = this.classList.contains('bg-secondary');
                
                if (isCompleted) {
                    this.classList.remove('bg-secondary', 'border-secondary', 'text-on-secondary');
                    this.classList.add('bg-transparent', 'border-outline-variant');
                    this.innerHTML = '';
                    this.parentElement.querySelector('.line-through')?.classList.remove('line-through', 'opacity-70');
                } else {
                    this.classList.add('bg-secondary', 'border-secondary', 'text-on-secondary');
                    this.classList.remove('bg-transparent', 'border-outline-variant');
                    this.innerHTML = '<span class="material-symbols-outlined text-[14px]">check</span>';
                    this.parentElement.querySelectorAll('span.font-body-medium')[0].classList.add('line-through', 'opacity-70');
                }
            });
        });
    </script>
</body></html>