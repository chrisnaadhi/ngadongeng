<script lang="ts">
	interface Props {
		label: string;
		id: string;
		type?: string;
		placeholder?: string;
		value?: string;
		error?: string;
		hint?: string;
		required?: boolean;
		disabled?: boolean;
		rows?: number;
		resize?: 'none' | 'vertical' | 'both';
		[key: string]: unknown;
	}
	let {
		label,
		id,
		placeholder,
		value = $bindable(''),
		error,
		hint,
		required = false,
		disabled = false,
		rows = 5,
		resize = 'vertical',
		...rest
	}: Props = $props();

	const resizeMap: Record<string, string> = {
		none: 'resize-none',
		vertical: 'resize-y',
		both: 'resize'
	};

	let resizeClass = $derived(resizeMap[resize]);
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="font-sans text-sm font-medium text-bark">
		{label}{#if required}<span class="text-danger ml-0.5" aria-hidden="true">*</span>{/if}
	</label>
	<textarea
		{id}
		{placeholder}
		{rows}
		{required}
		{disabled}
		bind:value
		aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
		aria-invalid={error ? true : undefined}
		class="input-base resize-y min-h-[120px] {resizeClass} {disabled
			? 'opacity-50 cursor-not-allowed'
			: ''} {error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}"
		{...rest}
	></textarea>
	{#if error}
		<span id="{id}-error" class="text-danger text-xs">{error}</span>
	{:else if hint}
		<span id="{id}-hint" class="text-kulit text-xs">{hint}</span>
	{/if}
</div>
