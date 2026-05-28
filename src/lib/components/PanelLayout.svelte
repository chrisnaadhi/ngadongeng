<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		href: string;
		label: string;
		icon: string;
	}

	interface Props {
		title: string;
		homeHref?: string;
		accentClass?: string;
		accentTextClass?: string;
		navItems: NavItem[];
		actionLabel?: string;
		actionHref?: string;
		children: import('svelte').Snippet;
	}

	let {
		title,
		homeHref = '/',
		accentClass = 'bg-tanah',
		accentTextClass = 'text-cream',
		navItems,
		actionLabel,
		actionHref,
		children
	}: Props = $props();

	function isActive(href: string): boolean {
		return $page.url.pathname === href;
	}
</script>

<div class="min-h-screen bg-cream">
	<!-- Top bar -->
	<header class="{accentClass} {accentTextClass} sticky top-0 z-30 shadow-md">
		<div class="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
			<div class="flex items-center gap-2">
				<a
					href={homeHref}
					class="flex items-center gap-1.5 font-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
				>
					<span class="i-ph-house-bold text-sm" aria-hidden="true"></span>
					<span class="hidden sm:inline">Beranda</span>
				</a>
				<span class="opacity-30 text-sm mx-1">›</span>
				<span class="font-display font-semibold text-sm tracking-wide">{title}</span>
			</div>
			{#if actionLabel && actionHref}
				<a
					href={actionHref}
					class="hidden sm:inline-flex items-center gap-1.5 bg-padi text-night px-3.5 py-1.5 rounded-lg text-sm font-semibold hover:bg-padi/90 transition-colors"
				>
					<span class="i-ph-plus-bold text-xs" aria-hidden="true"></span>
					{actionLabel}
				</a>
			{/if}
		</div>
	</header>

	<!-- Content + sidebar -->
	<div class="mx-auto max-w-6xl px-4 py-6 flex gap-6 pb-24 md:pb-8">
		<!-- Desktop sidebar -->
		<nav class="hidden md:block w-52 shrink-0" aria-label="Navigasi panel">
			<div class="panel-card p-2.5 sticky top-20">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5
							{isActive(item.href)
							? accentClass + ' ' + accentTextClass + ' shadow-sm'
							: 'text-bark hover:bg-bark/8'}"
					>
						<span class="{item.icon} text-base shrink-0" aria-hidden="true"></span>
						{item.label}
					</a>
				{/each}
			</div>
		</nav>

		<!-- Main area -->
		<main class="flex-1 min-w-0">
			{@render children()}
		</main>
	</div>
</div>

<!-- Mobile bottom nav -->
<nav
	class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-cream border-t border-kulit/30 flex shadow-[0_-2px_12px_rgba(92,61,42,0.06)]"
	aria-label="Navigasi mobile"
>
	{#each navItems as item}
		<a
			href={item.href}
			class="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors
				{isActive(item.href) ? 'text-tanah' : 'text-bark/55 hover:text-bark'}"
		>
			<span class="{item.icon} text-xl" aria-hidden="true"></span>
			<span class="truncate w-full text-center px-1">{item.label}</span>
		</a>
	{/each}
</nav>
