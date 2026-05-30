<script lang="ts">
	import { resolve } from '$app/paths';
	import type { DongengStory } from '$lib/types';
	import Avatar from './ui/Avatar.svelte';
	import Chip from './ui/Chip.svelte';

	interface Props {
		story: DongengStory;
	}
	let { story }: Props = $props();

	function relativeDate(iso: string): string {
		const diff = Date.now() - new Date(iso).getTime();
		const days = Math.floor(diff / 86400000);
		if (days === 0) return 'Hari ini';
		if (days < 2) return '1 hari lalu';
		if (days < 30) return `${days} hari lalu`;
		const m = Math.floor(days / 30);
		return m < 12 ? `${m} bulan lalu` : `${Math.floor(m / 12)} tahun lalu`;
	}

	const fallbacks: Record<string, string> = {
		teks: 'from-parchment to-kulit/40',
		komik: 'from-tanah/20 to-parchment',
		audio: 'from-cai/20 to-parchment',
		audiovisual: 'from-night/80 to-cai-dark/60'
	};

	let gradient = $derived(fallbacks[story.format]);
	let date = $derived(relativeDate(story.publishedAt));
</script>

<a
	href={resolve('/cerita/' + story.slug)}
	class="card-hover flex rounded-lg overflow-hidden no-underline"
>
	<div class="relative w-32 h-24 flex-shrink-0 bg-gradient-to-br {gradient}">
		{#if story.coverUrl}
			<img
				src={story.coverUrl}
				alt={story.title}
				class="w-full h-full object-cover"
				loading="lazy"
			/>
		{/if}
		<div class="absolute top-2 left-2">
			<Chip format={story.format} />
		</div>
	</div>
	<div class="flex-1 p-4 min-w-0">
		<h3 class="heading text-sm line-clamp-2 mb-1">{story.title}</h3>
		<div class="flex items-center gap-2 mt-2">
			<Avatar name={story.author.displayName} size="sm" />
			<div>
				<p class="font-sans text-xs font-medium text-bark">{story.author.displayName}</p>
				<p class="font-mono text-xs text-kulit">{date}</p>
			</div>
		</div>
	</div>
</a>
