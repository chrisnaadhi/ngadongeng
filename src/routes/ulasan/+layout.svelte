<script lang="ts">
	import PanelLayout from '$lib/components/PanelLayout.svelte';

	let { children } = $props();

	const navItems = [
		{ href: '/ulasan', label: 'Antrian Ulasan', icon: 'i-ph-stack-bold' },
		{ href: '/ulasan/riwayat', label: 'Riwayat', icon: 'i-ph-clock-counterclockwise-bold' }
	];
</script>

<PanelLayout title="Panel Ulasan" accentClass="bg-cai" accentTextClass="text-cream" {navItems}>
	{@render children()}
</PanelLayout>
