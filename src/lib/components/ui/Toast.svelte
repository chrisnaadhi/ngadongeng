<script lang="ts">
	import type { Toast } from '$lib/stores/toast';
	import { removeToast } from '$lib/stores/toast';

	interface Props {
		toast: Toast;
	}
	let { toast }: Props = $props();

	const icons = {
		success: 'i-ph-check-circle',
		danger: 'i-ph-x-circle',
		warning: 'i-ph-warning',
		info: 'i-ph-info'
	};
	const colors = {
		success: 'border-success text-success',
		danger: 'border-danger text-danger',
		warning: 'border-padi text-padi-dark',
		info: 'border-cai text-cai'
	};
</script>

<div
	class="flex items-start gap-3 bg-cream border-l-4 {colors[
		toast.type
	]} rounded-md px-4 py-3 shadow-lg font-sans text-sm text-bark max-w-sm w-full pointer-events-auto"
	role="alert"
	aria-live="polite"
>
	<i class="{icons[toast.type]} text-lg flex-shrink-0 mt-0.5" aria-hidden="true"></i>
	<p class="flex-1">{toast.message}</p>
	<button
		onclick={() => removeToast(toast.id)}
		class="flex-shrink-0 text-kulit hover:text-bark transition-colors"
		aria-label="Tutup"
	>
		<i class="i-ph-x" aria-hidden="true"></i>
	</button>
</div>
