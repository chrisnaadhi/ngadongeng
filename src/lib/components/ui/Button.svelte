<script lang="ts">
	import Spinner from './Spinner.svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'soft';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		children?: import('svelte').Snippet;
		iconLeft?: import('svelte').Snippet;
		iconRight?: import('svelte').Snippet;
		[key: string]: unknown;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		disabled = false,
		loading = false,
		fullWidth = false,
		children,
		iconLeft,
		iconRight,
		...rest
	}: Props = $props();

	const variantMap: Record<string, string> = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		soft: 'btn-soft'
	};

	const sizeMap: Record<string, string> = {
		sm: 'btn-sm',
		md: '',
		lg: 'btn-lg'
	};

	let variantClass = $derived(variantMap[variant]);
	let sizeClass = $derived(sizeMap[size]);
	let cls = $derived(
		[
			variantClass,
			sizeClass,
			fullWidth ? 'w-full' : '',
			disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#if href}
	<a {href} class={cls} aria-disabled={disabled} {...rest}>
		{#if iconLeft}{@render iconLeft()}{/if}
		{#if loading}<Spinner size={16} />{/if}
		{#if children}{@render children()}{/if}
		{#if iconRight}{@render iconRight()}{/if}
	</a>
{:else}
	<button {type} class={cls} {disabled} aria-disabled={disabled} aria-busy={loading} {...rest}>
		{#if iconLeft}{@render iconLeft()}{/if}
		{#if loading}<Spinner size={16} />{/if}
		{#if children}{@render children()}{/if}
		{#if iconRight}{@render iconRight()}{/if}
	</button>
{/if}
