<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}
	interface Props {
		label: string;
		id: string;
		options: Option[];
		value?: string;
		placeholder?: string;
		error?: string;
		required?: boolean;
		[key: string]: unknown;
	}
	let {
		label,
		id,
		options,
		value = $bindable(''),
		placeholder,
		error,
		required = false,
		...rest
	}: Props = $props();
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<label for={id} class="font-sans text-sm font-medium text-bark">
			{label}{#if required}<span class="text-danger ml-0.5" aria-hidden="true">*</span>{/if}
		</label>
	{/if}
	<div class="relative">
		<select
			{id}
			bind:value
			{required}
			aria-invalid={error ? true : undefined}
			class="input-base appearance-none pr-8 {error ? 'border-danger' : ''}"
			{...rest}
		>
			{#if placeholder}
				<option value="" disabled selected={!value}>{placeholder}</option>
			{/if}
			{#each options as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
		<i
			class="i-ph-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-bark pointer-events-none"
			aria-hidden="true"
		></i>
	</div>
	{#if error}
		<span class="text-danger text-xs">{error}</span>
	{/if}
</div>
