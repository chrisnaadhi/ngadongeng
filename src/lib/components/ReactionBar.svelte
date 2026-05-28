<script lang="ts">
	interface Reaction {
		emoji: string;
		label: string;
		count: number;
		reacted: boolean;
	}

	interface Props {
		storyId: string;
		reactions?: Reaction[];
		ontoggle?: (emoji: string) => void;
	}

	const defaultReactions: Reaction[] = [
		{ emoji: '❤️', label: 'Nyukcruk', count: 0, reacted: false },
		{ emoji: '👏', label: 'Sae Pisan', count: 0, reacted: false },
		{ emoji: '😄', label: 'Pikaseurieun', count: 0, reacted: false },
		{ emoji: '🤔', label: 'Pikir Heula', count: 0, reacted: false },
		{ emoji: '😢', label: 'Matak Sedih', count: 0, reacted: false }
	];

	let { storyId, reactions = defaultReactions, ontoggle }: Props = $props();
	let localReactions = $state([...reactions]);

	function toggle(i: number) {
		localReactions = localReactions.map((r, idx) =>
			idx === i ? { ...r, reacted: !r.reacted, count: r.reacted ? r.count - 1 : r.count + 1 } : r
		);
		ontoggle?.(localReactions[i].emoji);
	}
</script>

<div class="flex flex-wrap gap-2" aria-label="Reaksi cerita">
	{#each localReactions as reaction, i}
		<button
			onclick={() => toggle(i)}
			class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-sans transition-all duration-base
             {reaction.reacted
				? 'bg-padi/30 border border-padi font-semibold text-bark'
				: 'bg-parchment hover:bg-padi/20 border border-kulit/40 text-bark/70 hover:text-bark'}"
			aria-pressed={reaction.reacted}
			title={reaction.label}
		>
			<span aria-hidden="true">{reaction.emoji}</span>
			<span class="font-mono text-xs">{reaction.count}</span>
			<span class="sr-only">{reaction.label}</span>
		</button>
	{/each}
</div>
