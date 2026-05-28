<script lang="ts">
	interface Props {
		placeholder?: string;
		autofocus?: boolean;
		size?: 'sm' | 'md' | 'lg';
		value?: string;
		onsearch?: (query: string) => void;
		onclear?: () => void;
	}

	let {
		placeholder = 'Cari dongeng, tokoh, atau cerita...',
		autofocus = false,
		size = 'md',
		value = $bindable(''),
		onsearch,
		onclear
	}: Props = $props();

	let debounceTimer: ReturnType<typeof setTimeout>;

	function handleInput() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			onsearch?.(value);
		}, 300);
	}

	function clear() {
		value = '';
		onclear?.();
		onsearch?.('');
	}
</script>

<div class="relative">
	<i
		class="i-ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-kulit pointer-events-none"
		aria-hidden="true"
	></i>
	<input
		type="search"
		class="input-base pl-10 {value ? 'pr-10' : ''}"
		{placeholder}
		bind:value
		oninput={handleInput}
		autofocus={autofocus || undefined}
		aria-label="Cari cerita"
	/>
	{#if value}
		<button
			onclick={clear}
			class="absolute right-3 top-1/2 -translate-y-1/2 text-kulit hover:text-bark transition-colors"
			aria-label="Hapus pencarian"
		>
			<i class="i-ph-x" aria-hidden="true"></i>
		</button>
	{/if}
</div>
