<script lang="ts">
	import PanelLayout from '$lib/components/PanelLayout.svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/dashboard', label: 'Cerita Saya', icon: 'i-ph-books-bold' },
		{ href: '/dashboard/cerita/baru', label: 'Kirim Cerita', icon: 'i-ph-plus-circle-bold' }
	];
</script>

<PanelLayout
	title="Dapur Cerita"
	accentClass="bg-tanah"
	accentTextClass="text-cream"
	{navItems}
	actionLabel="Kirim Cerita"
	actionHref="/dashboard/cerita/baru"
>
	{@render children()}
</PanelLayout>
