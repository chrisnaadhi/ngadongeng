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
		[key: string]: unknown;
	}
	let {
		label,
		id,
		type = 'text',
		placeholder,
		value = $bindable(''),
		error,
		hint,
		required = false,
		disabled = false,
		...rest
	}: Props = $props();
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="font-sans text-sm font-medium text-bark">
		{label}{#if required}<span class="text-danger ml-0.5" aria-hidden="true">*</span>{/if}
	</label>
	<input
		{id}
		{type}
		{placeholder}
		bind:value
		{required}
		{disabled}
		aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
		aria-invalid={error ? true : undefined}
		class="input-base {disabled ? 'opacity-50 cursor-not-allowed' : ''} {error
			? 'border-danger focus:border-danger focus:ring-danger/20'
			: ''}"
		{...rest}
	/>
	{#if error}
		<span id="{id}-error" class="text-danger text-xs">{error}</span>
	{:else if hint}
		<span id="{id}-hint" class="text-kulit text-xs">{hint}</span>
	{/if}
</div>
