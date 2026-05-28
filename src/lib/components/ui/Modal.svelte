<script lang="ts">
	interface Props {
		open: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		closable?: boolean;
		onclose?: () => void;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
	}

	let { open, title, size = 'md', closable = true, onclose, children, footer }: Props = $props();

	const sizeMap: Record<string, string> = {
		sm: 'max-w-sm',
		md: 'max-w-lg',
		lg: 'max-w-2xl'
	};

	let sizeClass = $derived(sizeMap[size]);
	let titleId = $derived(title ? 'modal-title-' + Math.random().toString(36).slice(2) : undefined);

	function handleClose() {
		if (closable && onclose) onclose();
	}

	function handleOverlayClick() {
		handleClose();
	}

	function handleDialogClick(e: MouseEvent) {
		e.stopPropagation();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) handleClose();
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-night/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
		role="presentation"
		onclick={handleOverlayClick}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div
			class="bg-cream rounded-xl p-8 w-full shadow-2xl relative {sizeClass}"
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			tabindex="-1"
			onclick={handleDialogClick}
		>
			{#if title || closable}
				<div class="flex items-center justify-between mb-6">
					{#if title}
						<h2 id={titleId} class="heading text-xl text-bark">{title}</h2>
					{:else}
						<span></span>
					{/if}
					{#if closable}
						<button
							onclick={handleClose}
							class="text-kulit hover:text-bark transition-colors p-1 rounded-md hover:bg-parchment"
							aria-label="Tutup"
						>
							<i class="i-ph-x text-lg" aria-hidden="true"></i>
						</button>
					{/if}
				</div>
			{/if}

			<div>
				{#if children}{@render children()}{/if}
			</div>

			{#if footer}
				<div class="mt-6 flex justify-end gap-3">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
