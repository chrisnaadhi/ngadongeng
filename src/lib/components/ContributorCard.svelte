<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Contributor } from '$lib/types';
	import Avatar from './ui/Avatar.svelte';
	import Badge from './ui/Badge.svelte';

	interface Props {
		contributor: Contributor;
	}
	let { contributor }: Props = $props();
</script>

<a
	href={resolve('/kontribusi')}
	class="card-hover p-5 flex flex-col items-center text-center gap-3 no-underline rounded-lg"
>
	<Avatar
		name={contributor.displayName}
		src={contributor.avatarUrl}
		size="lg"
		badge={contributor.role}
	/>
	<Badge type={contributor.role} />
	<div>
		<p class="heading text-base">{contributor.displayName}</p>
		{#if contributor.bio}
			<p class="prose-body text-sm text-bark/60 mt-1 line-clamp-2">{contributor.bio}</p>
		{/if}
	</div>
	<p class="font-mono text-xs text-kulit">{contributor.storyCount} cerita</p>
</a>
