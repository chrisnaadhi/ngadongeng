<script lang="ts">
	import { resolve } from '$app/paths';
	import DongengCard from '$lib/components/DongengCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { DongengStory } from '$lib/types';

	interface Props {
		stories: DongengStory[];
		title?: string;
		sectionLabel?: string;
	}
	let {
		stories,
		title = 'Cerita yang Patut Kamu Baca Sekarang',
		sectionLabel = 'PILIHAN KURATOR'
	}: Props = $props();
</script>

<section class="py-16">
	<div class="container-md">
		<!-- Header -->
		<div class="flex items-end justify-between mb-8">
			<div>
				<p class="label text-tanah mb-2">{sectionLabel}</p>
				<h2 class="heading text-2xl md:text-3xl">{title}</h2>
			</div>
			<Button variant="soft" size="sm" href={resolve('/cerita')}>Lihat semua →</Button>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each stories as story}
				<DongengCard {story} />
			{/each}
		</div>
	</div>
</section>
