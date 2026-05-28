<script lang="ts">
	import type { DongengFormat } from '$lib/types';

	interface Props {
		format: DongengFormat;
		label?: string;
	}

	const labels: Record<DongengFormat, string> = {
		teks: 'Teks',
		komik: 'Komik',
		audio: 'Audio',
		audiovisual: 'Audiovisual'
	};

	const icons: Record<DongengFormat, string> = {
		teks: 'i-ph-book-open',
		komik: 'i-ph-paint-brush',
		audio: 'i-ph-microphone',
		audiovisual: 'i-ph-video-camera'
	};

	const chipClass: Record<DongengFormat, string> = {
		teks: 'chip-teks',
		komik: 'chip-komik',
		audio: 'chip-audio',
		audiovisual: 'chip-av'
	};

	let { format, label }: Props = $props();
	let displayLabel = $derived(label ?? labels[format]);
	let cls = $derived(chipClass[format]);
	let icon = $derived(icons[format]);
</script>

<span class={cls}>
	<i class={icon} aria-hidden="true"></i>
	{displayLabel}
</span>
