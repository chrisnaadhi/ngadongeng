<script lang="ts">
	import { toasts } from '$lib/stores/toast';
	import Toast from './Toast.svelte';
</script>

<div
	class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none sm:bottom-4 sm:right-4 bottom-4 inset-x-4 sm:inset-x-auto items-end"
>
	{#each $toasts as toast (toast.id)}
		<Toast {toast} />
	{/each}
</div>
