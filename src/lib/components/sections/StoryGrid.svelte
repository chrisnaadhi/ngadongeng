<script lang="ts">
	import { resolve } from '$app/paths';
	import DongengCard from '$lib/components/DongengCard.svelte';
	import type { DongengStory } from '$lib/types';

	interface Props {
		stories: DongengStory[];
		loading?: boolean;
		columns?: 2 | 3;
	}
	let { stories, loading = false, columns = 3 }: Props = $props();
	let colClass = $derived(
		columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
	);
</script>

{#if loading}
	<div class="grid {colClass} gap-6">
		{#each Array(6) as _}
			<div class="card rounded-lg overflow-hidden animate-pulse">
				<div class="aspect-video bg-kulit/20"></div>
				<div class="p-5 space-y-3">
					<div class="h-3 bg-kulit/20 rounded w-1/3"></div>
					<div class="h-5 bg-kulit/30 rounded w-3/4"></div>
					<div class="h-4 bg-kulit/20 rounded w-full"></div>
					<div class="h-4 bg-kulit/20 rounded w-2/3"></div>
				</div>
			</div>
		{/each}
	</div>
{:else if stories.length === 0}
	<div class="text-center py-20">
		<div class="w-20 h-20 rounded-full bg-parchment flex items-center justify-center mx-auto mb-6">
			<i class="i-ph-magnifying-glass text-3xl text-kulit" aria-hidden="true"></i>
		</div>
		<h3 class="heading text-xl mb-3">Belum ada cerita yang cocok.</h3>
		<p class="prose-body text-bark/60 max-w-sm mx-auto mb-6">
			Coba ubah kata kunci atau filter pencarian.<br />
			Atau jadilah yang pertama menambahkan cerita ini!
		</p>
		<a href={resolve('/dashboard/cerita/baru')} class="btn-primary btn-md inline-flex"
			>Bagikan Cerita →</a
		>
	</div>
{:else}
	<div class="grid {colClass} gap-6">
		{#each stories as story}
			<DongengCard {story} />
		{/each}
	</div>
{/if}
