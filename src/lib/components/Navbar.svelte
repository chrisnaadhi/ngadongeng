<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		transparent?: boolean;
	}

	let { transparent = false }: Props = $props();

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '/cerita', label: 'Cerita' },
		{ href: '/kontributor', label: 'Kontributor' },
		{ href: '/tentang', label: 'Tentang' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	// Close mobile menu on route change
	$effect(() => {
		$page.url.pathname;
		mobileOpen = false;
	});
</script>

<svelte:window onscroll={handleScroll} />

<header
	class="sticky top-0 z-40 transition-all duration-slow
         {scrolled || !transparent ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}"
>
	<div class="container-md flex items-center h-18 gap-6 md:gap-8">
		<!-- Logo -->
		<a
			href="/"
			class="flex items-center gap-2 flex-shrink-0 no-underline"
			aria-label="Ngadongeng — Beranda"
		>
			<div class="w-8 h-8 rounded-full bg-tanah flex items-center justify-center flex-shrink-0">
				<i class="i-ph-book-open text-cream text-sm" aria-hidden="true"></i>
			</div>
			<span class="font-display font-bold text-md text-bark">Ngadongeng</span>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden md:flex items-center gap-6 flex-1" aria-label="Navigasi utama">
			{#each navLinks as link}
				<a
					href={link.href}
					class="font-sans text-sm font-medium transition-colors duration-fast no-underline
                 {$page.url.pathname.startsWith(link.href)
						? 'text-tanah underline underline-offset-4 decoration-2'
						: 'text-bark hover:text-tanah'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Desktop actions -->
		<div class="ml-auto flex items-center gap-3">
			<a
				href="/cari"
				class="hidden md:flex items-center text-bark hover:text-tanah transition-colors"
				aria-label="Cari cerita"
			>
				<i class="i-ph-magnifying-glass text-xl" aria-hidden="true"></i>
			</a>
			<a href="/masuk" class="btn-soft btn-sm hidden md:inline-flex">Masuk</a>
			<a href="/cerita/baru" class="btn-primary btn-sm hidden md:inline-flex">
				Bagikan Cerita
				<i class="i-ph-arrow-right" aria-hidden="true"></i>
			</a>
			<!-- Mobile hamburger -->
			<button
				class="md:hidden text-bark hover:text-tanah transition-colors"
				onclick={toggleMobile}
				aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
				aria-expanded={mobileOpen}
			>
				<i class={mobileOpen ? 'i-ph-x text-2xl' : 'i-ph-list text-2xl'} aria-hidden="true"></i>
			</button>
		</div>
	</div>
</header>

<!-- Mobile drawer overlay -->
{#if mobileOpen}
	<div
		class="fixed inset-0 bg-night/50 z-30 md:hidden"
		onclick={closeMobile}
		aria-hidden="true"
	></div>
	<!-- Drawer -->
	<div class="fixed top-0 right-0 bottom-0 w-72 bg-cream z-40 shadow-2xl md:hidden flex flex-col">
		<div class="flex items-center justify-between p-5 border-b border-kulit/30">
			<span class="font-display font-bold text-md text-bark">Menu</span>
			<button
				onclick={closeMobile}
				class="text-bark hover:text-tanah transition-colors"
				aria-label="Tutup menu"
			>
				<i class="i-ph-x text-xl" aria-hidden="true"></i>
			</button>
		</div>
		<nav class="flex flex-col p-5 gap-1 flex-1" aria-label="Navigasi mobile">
			{#each navLinks as link}
				<a
					href={link.href}
					class="font-sans font-medium py-3 px-4 rounded-md transition-colors no-underline
                 {$page.url.pathname.startsWith(link.href)
						? 'bg-tanah/10 text-tanah font-semibold'
						: 'text-bark hover:bg-parchment'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
		<div class="p-5 border-t border-kulit/30 flex flex-col gap-3">
			<a href="/masuk" class="btn-soft btn-md w-full text-center">Masuk</a>
			<a href="/cerita/baru" class="btn-primary btn-md w-full text-center">Bagikan Cerita</a>
		</div>
	</div>
{/if}
