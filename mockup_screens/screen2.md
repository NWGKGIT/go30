<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>go30 - Journal</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
        /* Custom scrollbar for a cleaner look */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #e2e2e2;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #c4c7c7;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body antialiased flex selection:bg-secondary-fixed selection:text-on-secondary-fixed">
<!-- Shell: SideNavBar (Hidden on Mobile) -->
<nav class="hidden md:flex flex-col justify-between py-stack-lg fixed left-0 top-0 h-full w-[240px] bg-surface-container-low border-r border-outline-variant z-10">
<div>
<!-- Header Brand -->
<div class="px-gutter mb-stack-lg flex items-center gap-3">
<div aria-label="Go 30 Logo" class="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold font-h2">g</div>
<div>
<div class="font-h2 text-h2 font-bold text-primary">go30</div>
<div class="font-label text-label text-on-surface-variant">Learning Tracker</div>
</div>
</div>
<!-- Navigation Links -->
<ul class="flex flex-col gap-1 px-stack-sm">
<li>
<a class="flex items-center gap-3 px-stack-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 ease-in-out font-body text-body font-medium" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">dashboard</span>
                        Dashboard
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-stack-md py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 ease-in-out font-body text-body font-medium" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">map</span>
                        Roadmap
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-stack-md py-2 rounded-lg text-secondary border-l-2 border-secondary bg-surface-container transition-colors duration-200 ease-in-out font-body text-body font-medium" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">edit_note</span>
                        Journal
                    </a>
</li>
</ul>
</div>
<!-- Footer / Meta -->
<div class="px-stack-sm">
<div class="flex flex-col gap-2 mb-stack-lg px-stack-md">
<div class="flex items-center gap-2 text-on-surface-variant font-label text-label">
<span class="material-symbols-outlined text-[16px] text-[#ea580c]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
                    Streak: 12 Days
                </div>
<div class="flex items-center gap-2 text-on-surface-variant font-label text-label">
<span class="material-symbols-outlined text-[16px] text-secondary" style="font-variation-settings: 'FILL' 1;">military_tech</span>
                    4,250 XP
                </div>
</div>
<a class="flex items-center gap-3 px-stack-md py-2 mx-stack-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 ease-in-out font-body text-body font-medium" href="#">
                Logout
            </a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 md:ml-[240px] min-h-screen flex flex-col relative w-full">
<!-- Shell: TopAppBar -->
<header class="flex justify-between items-center h-16 px-gutter w-full border-b border-outline-variant bg-background sticky top-0 z-10 transition-all duration-200 ease-in-out">
<div class="md:hidden font-h2 text-h2 font-black text-primary">go30</div>
<!-- Empty div for alignment on desktop, title is handled in main content or sidebar -->
<div class="hidden md:block"></div>
<div class="flex items-center gap-4 text-on-surface-variant">
<button class="hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container">
<span class="material-symbols-outlined">calendar_today</span>
</button>
</div>
</header>
<!-- Canvas Body -->
<div class="max-w-[900px] w-full mx-auto px-margin-mobile md:px-gutter py-stack-lg flex-1">
<!-- Page Header -->
<div class="mb-stack-lg flex items-baseline justify-between border-b border-outline-variant pb-stack-sm">
<h1 class="font-h1 text-h1 font-black text-primary">Journal Entries</h1>
<span class="font-body-medium text-body-medium text-on-surface-variant">12 Total</span>
</div>
<!-- Journal Timeline / List -->
<div class="flex flex-col gap-stack-lg relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-outline-variant before:via-outline-variant before:to-transparent">
<!-- Entry: Day 11 -->
<article class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<!-- Icon / Node -->
<div class="flex items-center justify-center w-8 h-8 rounded-full border border-outline-variant bg-surface-container-lowest text-secondary shadow-[0_0_0_4px_#f9f9f8] absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-200">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">edit_note</span>
</div>
<!-- Content Card -->
<div class="w-full md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-stack-md bg-surface border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-200">
<div class="flex flex-col gap-1 mb-stack-sm">
<div class="flex items-center justify-between">
<span class="bg-primary text-on-primary font-label text-label px-2 py-0.5 rounded-DEFAULT uppercase tracking-wider text-[10px]">Day 11</span>
<time class="font-body-medium text-body-medium text-on-surface-variant text-[12px]">Oct 24, 2023</time>
</div>
<h3 class="font-h3 text-h3 text-primary mt-1">Refactoring the Auth Flow</h3>
</div>
<p class="font-body text-body text-on-surface-variant line-clamp-3 mb-stack-md">
                            Spent today ripping out the old context provider and implementing a cleaner zustand store for authentication state. The reduction in boilerplate is immediately noticeable, though tracking down a race condition with the initial token load took a solid hour. Next up is wiring this into the new layout components.
                        </p>
<!-- Code Snippet (Collapsed) -->
<div class="border border-outline-variant rounded-md overflow-hidden bg-surface-container-lowest group/code cursor-pointer">
<div class="flex items-center justify-between px-stack-sm py-2 border-b border-outline-variant bg-surface-container-low group-hover/code:bg-surface-variant transition-colors">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-outline">code</span>
<span class="font-code text-code text-on-surface-variant text-[12px]">authStore.ts</span>
</div>
<span class="material-symbols-outlined text-[16px] text-outline group-hover/code:text-primary transition-colors">expand_more</span>
</div>
<div class="p-stack-sm font-code text-code text-on-surface-variant text-[12px] opacity-60 italic bg-surface-container-lowest">
                                // Click to expand snippet
                            </div>
</div>
</div>
</article>
<!-- Entry: Day 10 -->
<article class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<!-- Icon / Node -->
<div class="flex items-center justify-center w-8 h-8 rounded-full border border-outline-variant bg-surface-container-lowest text-secondary shadow-[0_0_0_4px_#f9f9f8] absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-200">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">edit_note</span>
</div>
<!-- Content Card -->
<div class="w-full md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 p-stack-md bg-surface border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-200">
<div class="flex flex-col gap-1 mb-stack-sm">
<div class="flex items-center justify-between">
<span class="bg-surface-tint text-on-primary font-label text-label px-2 py-0.5 rounded-DEFAULT uppercase tracking-wider text-[10px]">Day 10</span>
<time class="font-body-medium text-body-medium text-on-surface-variant text-[12px]">Oct 23, 2023</time>
</div>
<h3 class="font-h3 text-h3 text-primary mt-1">Mastering CSS Grid Patterns</h3>
</div>
<p class="font-body text-body text-on-surface-variant line-clamp-3 mb-stack-md">
                            Finally wrapped my head around minmax and auto-fit for responsive grids without media queries. Built out the new dashboard layout prototype using just grid areas. It feels much more robust than the previous flexbox masonry attempt.
                        </p>
<!-- Code Snippet (Collapsed) -->
<div class="border border-outline-variant rounded-md overflow-hidden bg-surface-container-lowest group/code cursor-pointer">
<div class="flex items-center justify-between px-stack-sm py-2 border-b border-outline-variant bg-surface-container-low group-hover/code:bg-surface-variant transition-colors">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-outline">code</span>
<span class="font-code text-code text-on-surface-variant text-[12px]">DashboardGrid.tsx</span>
</div>
<span class="material-symbols-outlined text-[16px] text-outline group-hover/code:text-primary transition-colors">expand_more</span>
</div>
</div>
</div>
</article>
</div>
<!-- Empty State / Load More (Contextual) -->
<div class="mt-stack-lg flex justify-center pb-stack-lg">
<button class="px-4 py-2 border border-outline-variant rounded-lg text-on-surface-variant font-body-medium text-body-medium hover:bg-surface-container hover:text-primary transition-colors">
                    Load Older Entries
                </button>
</div>
</div>
</main>
</body></html>