<script lang="ts">
	interface Props {
		size?: number;
		color?: string;
	}
	let { size = 20, color = 'currentColor' }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	aria-hidden="true"
	class="animate-spin"
>
	<circle cx="12" cy="12" r="10" stroke={color} stroke-width="3" stroke-opacity="0.25" />
	<path d="M12 2a10 10 0 0 1 10 10" stroke={color} stroke-width="3" stroke-linecap="round" />
</svg>
