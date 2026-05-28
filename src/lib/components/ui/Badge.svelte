<script lang="ts">
	import type { BadgeType } from '$lib/types';

	interface Props {
		type: BadgeType;
		label?: string;
	}

	const defaults: Record<BadgeType, { label: string; cls: string }> = {
		tbm: { label: 'TBM Member', cls: 'bg-tanah text-cream' },
		komunitas: { label: 'Komunitas', cls: 'bg-cai text-cream' },
		kurator: { label: 'Kurator', cls: 'bg-padi text-bark' },
		individu: { label: 'Individu', cls: 'bg-kulit text-bark' },
		baru: { label: 'Baru', cls: 'bg-success text-cream' },
		unggulan: { label: 'Unggulan', cls: 'bg-padi-dark text-cream' }
	};

	let { type, label }: Props = $props();
	let config = $derived(defaults[type]);
	let displayLabel = $derived(label ?? config.label);
</script>

<span
	class="inline-flex items-center px-2.5 py-0.5 rounded-full font-sans font-semibold text-xs {config.cls}"
>
	{displayLabel}
</span>
