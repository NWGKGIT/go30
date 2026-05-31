<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>go30 - Day 1 Detail</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&amp;family=JetBrains+Mono:wght@400&amp;display=swap" rel="stylesheet"/>
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
        body { background-color: #f9f9f8; color: #1a1c1c; }
        .spring-transition { transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .glass-panel { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(8px); border: 1px solid #c4c7c7; }
        .bento-card { border: 1px solid #c4c7c7; background-color: #ffffff; border-radius: 0.25rem; }
    </style>
</head>
<body class="flex flex-col md:flex-row min-h-screen bg-background text-on-background font-body text-body selection:bg-secondary-fixed selection:text-on-secondary-fixed">
<!-- TopAppBar (Mobile) -->
<header class="md:hidden flex justify-between items-center h-16 px-margin-mobile w-full bg-background border-b border-outline-variant">
<div class="font-h1 text-h1 font-black text-primary">go30</div>
<div class="flex items-center gap-stack-md">
<span class="material-symbols-outlined text-primary" data-icon="calendar_today">calendar_today</span>
</div>
</header>
<!-- SideNavBar (Desktop) -->
<nav class="hidden md:flex fixed left-0 top-0 h-full w-[240px] bg-surface-container-low border-r border-outline-variant flex-col justify-between py-stack-lg z-50">
<div class="px-gutter">
<div class="mb-stack-lg flex items-center gap-3">
<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-on-primary font-bold">g</div>
<div>
<div class="font-h2 text-h2 font-bold text-primary">go30</div>
<div class="font-label text-label text-on-surface-variant">Learning Tracker</div>
</div>
</div>
<ul class="flex flex-col gap-base">
<li>
<a class="flex items-center gap-stack-sm px-3 py-2 rounded-lg text-secondary border-l-2 border-secondary bg-surface-container font-body-medium text-body-medium transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                        Dashboard
                    </a>
</li>
<li>
<a class="flex items-center gap-stack-sm px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors font-body-medium text-body-medium" href="#">
<span class="material-symbols-outlined" data-icon="map">map</span>
                        Roadmap
                    </a>
</li>
<li>
<a class="flex items-center gap-stack-sm px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors font-body-medium text-body-medium" href="#">
<span class="material-symbols-outlined" data-icon="edit_note">edit_note</span>
                        Journal
                    </a>
</li>
</ul>
</div>
<div class="px-gutter flex flex-col gap-stack-md">
<div class="flex items-center gap-stack-sm text-on-surface-variant font-label text-label">
<span class="material-symbols-outlined" data-icon="local_fire_department">local_fire_department</span>
                Streak: 12 Days
            </div>
<div class="flex items-center gap-stack-sm text-on-surface-variant font-label text-label">
<span class="material-symbols-outlined" data-icon="military_tech">military_tech</span>
                4,250 XP
            </div>
<button class="text-left font-label text-label text-on-surface-variant hover:text-primary mt-stack-md pt-stack-md border-t border-outline-variant">Logout</button>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 md:ml-[240px] px-margin-mobile md:px-gutter py-stack-lg max-w-[1200px] mx-auto w-full pb-24 md:pb-stack-lg">
<!-- Breadcrumbs -->
<nav class="flex items-center gap-2 font-label text-label text-on-surface-variant mb-stack-lg">
<a class="hover:text-primary transition-colors" href="#">Dashboard</a>
<span class="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
<span class="text-primary font-medium">Day 1</span>
</nav>
<!-- Header Section -->
<header class="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md pb-stack-sm border-b border-outline-variant">
<div>
<div class="flex items-center gap-3 mb-2">
<span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-label text-label rounded">Phase 1</span>
<span class="font-label text-label text-on-surface-variant uppercase tracking-wider">Week 1</span>
</div>
<h1 class="font-h1 text-h1 font-black text-primary">Day 1: Tooling + hello world + types</h1>
</div>
<div class="flex items-center gap-2">
<span class="flex items-center gap-1 px-3 py-1 bg-surface-container-highest border border-outline-variant rounded-full font-label text-label text-on-surface-variant">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
                    IN_PROGRESS
                </span>
</div>
</header>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-stack-md">
<!-- Left Column: Tasks & Go Tour -->
<div class="lg:col-span-7 flex flex-col gap-stack-md">
<!-- Task List Card -->
<section class="bento-card flex flex-col">
<div class="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-lg">
<h2 class="font-h3 text-h3 text-primary">Tasks</h2>
<span class="font-label text-label text-on-surface-variant">0/3 Completed</span>
</div>
<div class="p-stack-md flex flex-col gap-3 bg-surface-container-lowest rounded-b-lg">
<!-- Task Item 1 -->
<label class="flex items-start gap-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
<input class="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<div class="flex flex-col">
<span class="font-body-medium text-body-medium text-primary group-hover:text-secondary transition-colors">Install Go</span>
<span class="font-body text-body text-on-surface-variant text-[13px]">Download and install the latest stable release from go.dev.</span>
</div>
</label>
<!-- Task Item 2 -->
<label class="flex items-start gap-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
<input class="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<div class="flex flex-col">
<span class="font-body-medium text-body-medium text-primary group-hover:text-secondary transition-colors">Write Hello World</span>
<span class="font-body text-body text-on-surface-variant text-[13px]">Create a main.go file and print "Hello, World!".</span>
</div>
</label>
<!-- Task Item 3 -->
<label class="flex items-start gap-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
<input class="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox"/>
<div class="flex flex-col">
<span class="font-body-medium text-body-medium text-primary group-hover:text-secondary transition-colors">Basic Types Exercise</span>
<span class="font-body text-body text-on-surface-variant text-[13px]">Complete the basic types section in the Go Tour.</span>
</div>
</label>
</div>
</section>
<!-- Go Tour Integration Card -->
<section class="bento-card flex flex-col flex-1 min-h-[400px]">
<div class="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-lg">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary" data-icon="terminal">terminal</span>
<h2 class="font-h3 text-h3 text-primary">Go Tour</h2>
</div>
<div class="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant">
<span class="w-2 h-2 rounded-full bg-error animate-pulse"></span>
<span class="font-code text-code text-on-surface-variant">0:00 / 1:00</span>
</div>
</div>
<!-- Simulated Iframe Area -->
<div class="flex-1 bg-surface-variant rounded-b-lg p-1 relative overflow-hidden flex flex-col">
<div class="flex items-center gap-2 px-3 py-2 bg-surface-container-highest border-b border-outline-variant rounded-t">
<span class="font-code text-code text-on-surface-variant text-[11px]">go.dev/tour/basics/1</span>
</div>
<div class="flex-1 bg-surface-container-lowest flex items-center justify-center p-stack-lg rounded-b border border-t-0 border-outline-variant text-center">
<div class="max-w-md">
<span class="material-symbols-outlined text-4xl text-outline mb-4" data-icon="code_blocks">code_blocks</span>
<h3 class="font-h3 text-h3 text-primary mb-2">Packages, variables, and functions.</h3>
<p class="font-body text-body text-on-surface-variant mb-4">Learn the basic components of any Go program.</p>
<button class="px-4 py-2 bg-primary text-on-primary rounded font-body-medium text-body-medium hover:bg-on-primary-fixed-variant transition-colors">Start Module</button>
</div>
</div>
</div>
</section>
</div>
<!-- Right Column: Journal & Snippets -->
<div class="lg:col-span-5 flex flex-col gap-stack-md">
<!-- Journal Card -->
<section class="bento-card flex flex-col h-[300px]">
<div class="p-stack-sm px-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-lg">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-outline" data-icon="edit_note">edit_note</span>
<h2 class="font-body-medium text-body-medium text-primary">Journal</h2>
</div>
<span class="font-label text-label text-outline flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span> Saved
                        </span>
</div>
<textarea class="flex-1 w-full p-stack-md resize-none focus:outline-none focus:ring-0 border-none bg-surface-container-lowest rounded-b-lg font-body text-body text-on-background placeholder:text-outline-variant" placeholder="Write your notes here... Markdown is supported."></textarea>
</section>
<!-- Code Snippets Card -->
<section class="bento-card flex flex-col flex-1">
<div class="p-stack-sm px-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-lg">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-outline" data-icon="data_object">data_object</span>
<h2 class="font-body-medium text-body-medium text-primary">Snippets</h2>
</div>
<button class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-primary border border-outline-variant">
<span class="material-symbols-outlined text-[16px]" data-icon="add">add</span>
</button>
</div>
<div class="p-stack-sm flex flex-col gap-2 bg-surface-container-low rounded-b-lg overflow-y-auto max-h-[300px]">
<!-- Snippet Item -->
<details class="group bg-surface-container-lowest border border-outline-variant rounded-lg" open="">
<summary class="p-3 cursor-pointer list-none flex justify-between items-center font-body-medium text-body-medium text-primary select-none group-hover:bg-surface-container-low transition-colors rounded-t-lg">
                                Hello World
                                <span class="material-symbols-outlined text-outline transition-transform duration-200 group-open:-rotate-180" data-icon="expand_more">expand_more</span>
</summary>
<div class="p-3 pt-0 border-t border-outline-variant bg-surface-container-lowest rounded-b-lg">
<pre class="font-code text-code text-on-surface-variant bg-surface-container p-3 rounded mt-2 overflow-x-auto text-[12px]"><code>package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}</code></pre>
</div>
</details>
</div>
</section>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile) -->
<nav class="md:hidden fixed bottom-0 w-full bg-background border-t border-outline-variant flex justify-around py-2 pb-safe z-50">
<a class="flex flex-col items-center gap-1 p-2 text-secondary w-16 group" href="#">
<div class="w-full h-8 flex items-center justify-center rounded-full bg-surface-variant group-hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
</div>
<span class="font-label text-[10px] font-medium tracking-wide">Dashboard</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-on-surface-variant w-16 group hover:text-primary transition-colors" href="#">
<div class="w-full h-8 flex items-center justify-center rounded-full group-hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined" data-icon="map">map</span>
</div>
<span class="font-label text-[10px] font-medium tracking-wide">Roadmap</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-on-surface-variant w-16 group hover:text-primary transition-colors" href="#">
<div class="w-full h-8 flex items-center justify-center rounded-full group-hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined" data-icon="edit_note">edit_note</span>
</div>
<span class="font-label text-[10px] font-medium tracking-wide">Journal</span>
</a>
</nav>
<script>
        // Simple script to handle checkbox animations if needed
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if(e.target.checked) {
                    e.target.parentElement.classList.add('bg-surface-container-low');
                    e.target.parentElement.classList.add('opacity-70');
                    e.target.parentElement.querySelector('span').classList.add('line-through');
                } else {
                    e.target.parentElement.classList.remove('bg-surface-container-low');
                    e.target.parentElement.classList.remove('opacity-70');
                    e.target.parentElement.querySelector('span').classList.remove('line-through');
                }
            });
        });
    </script>
</body></html>