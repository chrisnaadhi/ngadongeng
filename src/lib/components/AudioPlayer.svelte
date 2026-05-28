<script lang="ts">
	interface Props {
		src: string;
		title: string;
		transcript?: string;
		duration?: number; // seconds, for display before load
	}

	let { src, title, transcript, duration: initialDuration }: Props = $props();

	let audioEl = $state<HTMLAudioElement | null>(null);
	let playing = $state(false);
	let progress = $state(0); // 0–100
	let volume = $state(1);
	let currentTime = $state(0);
	let totalDuration = $state(initialDuration ?? 0);

	function formatTime(secs: number): string {
		const m = Math.floor(secs / 60)
			.toString()
			.padStart(2, '0');
		const s = Math.floor(secs % 60)
			.toString()
			.padStart(2, '0');
		return `${m}:${s}`;
	}

	function togglePlay() {
		if (!audioEl) return;
		if (playing) {
			audioEl.pause();
		} else {
			audioEl.play();
		}
		playing = !playing;
	}

	function rewind10() {
		if (audioEl) audioEl.currentTime = Math.max(0, audioEl.currentTime - 10);
	}
	function forward10() {
		if (audioEl) audioEl.currentTime = Math.min(totalDuration, audioEl.currentTime + 10);
	}
	function skipBack() {
		if (audioEl) audioEl.currentTime = 0;
	}

	function handleTimeUpdate() {
		if (!audioEl) return;
		currentTime = audioEl.currentTime;
		progress = totalDuration ? (currentTime / totalDuration) * 100 : 0;
	}

	function handleLoadedMetadata() {
		if (!audioEl) return;
		totalDuration = audioEl.duration;
	}

	function handleEnded() {
		playing = false;
		progress = 0;
	}

	function seekTo(e: MouseEvent) {
		const bar = e.currentTarget as HTMLElement;
		const rect = bar.getBoundingClientRect();
		const ratio = (e.clientX - rect.left) / rect.width;
		if (audioEl) audioEl.currentTime = ratio * totalDuration;
	}

	$effect(() => {
		if (audioEl) audioEl.volume = volume;
	});
</script>

<div class="bg-parchment border border-kulit rounded-lg p-5">
	<audio
		bind:this={audioEl}
		{src}
		ontimeupdate={handleTimeUpdate}
		onloadedmetadata={handleLoadedMetadata}
		onended={handleEnded}
		class="hidden"
	></audio>

	<!-- Title + time -->
	<div class="flex justify-between items-center mb-3">
		<p class="heading text-sm line-clamp-1">{title}</p>
		<span class="font-mono text-xs text-kulit flex-shrink-0 ml-3">
			{formatTime(currentTime)} / {formatTime(totalDuration)}
		</span>
	</div>

	<!-- Progress bar -->
	<div
		class="relative h-1.5 bg-kulit/30 rounded-full mb-5 cursor-pointer"
		role="slider"
		aria-label="Progress audio"
		aria-valuenow={Math.round(progress)}
		aria-valuemin={0}
		aria-valuemax={100}
		tabindex="0"
		onclick={seekTo}
		onkeydown={(e) => {
			if (e.key === 'ArrowRight') forward10();
			if (e.key === 'ArrowLeft') rewind10();
		}}
	>
		<div
			class="h-full bg-tanah rounded-full transition-all duration-fast"
			style="width: {progress}%"
		></div>
		<div
			class="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-tanah-dark shadow"
			style="left: calc({progress}% - 6px)"
		></div>
	</div>

	<!-- Controls -->
	<div class="flex items-center justify-center gap-5">
		<button
			onclick={skipBack}
			class="text-bark hover:text-tanah transition-colors"
			aria-label="Ke awal"
		>
			<i class="i-ph-skip-back text-xl" aria-hidden="true"></i>
		</button>
		<button
			onclick={rewind10}
			class="flex items-center gap-1 text-bark hover:text-tanah transition-colors text-sm"
			aria-label="Mundur 10 detik"
		>
			<i class="i-ph-rewind text-xl" aria-hidden="true"></i>
		</button>
		<button
			onclick={togglePlay}
			class="w-12 h-12 rounded-full bg-tanah text-cream flex items-center justify-center hover:bg-tanah-dark transition-colors shadow-md"
			aria-label={playing ? 'Jeda' : 'Putar'}
		>
			<i class={playing ? 'i-ph-pause text-xl' : 'i-ph-play text-xl'} aria-hidden="true"></i>
		</button>
		<button
			onclick={forward10}
			class="flex items-center gap-1 text-bark hover:text-tanah transition-colors text-sm"
			aria-label="Maju 10 detik"
		>
			<i class="i-ph-fast-forward text-xl" aria-hidden="true"></i>
		</button>
		<div class="flex items-center gap-2 ml-auto">
			<i class="i-ph-speaker-high text-bark" aria-hidden="true"></i>
			<input
				type="range"
				min="0"
				max="1"
				step="0.1"
				bind:value={volume}
				class="w-20 accent-tanah"
				aria-label="Volume"
			/>
		</div>
	</div>

	<!-- Transcript accordion -->
	{#if transcript}
		<details class="mt-4 border-t border-kulit/30 pt-4">
			<summary class="label cursor-pointer select-none hover:text-bark transition-colors">
				Transkrip ▾
			</summary>
			<p class="prose-body text-sm mt-3 whitespace-pre-wrap text-bark/80">{transcript}</p>
		</details>
	{/if}
</div>
