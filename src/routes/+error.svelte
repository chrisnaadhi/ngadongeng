<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';

	const STATUS_MESSAGES: Record<number, { title: string; description: string; icon: string }> = {
		403: {
			title: 'Akses Ditolak',
			description: 'Kamu tidak memiliki izin untuk mengakses halaman ini.',
			icon: 'i-ph-lock'
		},
		404: {
			title: 'Halaman Tidak Ditemukan',
			description: 'Halaman yang kamu cari tidak ada atau sudah dipindahkan.',
			icon: 'i-ph-compass'
		},
		500: {
			title: 'Terjadi Kesalahan',
			description: 'Ada yang tidak beres di server kami. Coba lagi beberapa saat.',
			icon: 'i-ph-warning-circle'
		},
		503: {
			title: 'Layanan Tidak Tersedia',
			description: 'Layanan sedang tidak tersedia. Silakan coba beberapa saat lagi.',
			icon: 'i-ph-plug'
		}
	};

	const status = $derived($page.status);
	const info = $derived(
		STATUS_MESSAGES[status] ?? {
			title: 'Terjadi Kesalahan',
			description: $page.error?.message ?? 'Terjadi kesalahan yang tidak terduga.',
			icon: 'i-ph-warning'
		}
	);
</script>

<svelte:head>
	<title>{status} — {info.title} · Ngadongeng</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-20">
	<div class="text-center max-w-md mx-auto">
		<!-- Icon -->
		<div class="w-20 h-20 rounded-full bg-tanah/10 flex items-center justify-center mx-auto mb-6">
			<i class="{info.icon} text-4xl text-tanah" aria-hidden="true"></i>
		</div>

		<!-- Status code -->
		<p class="font-display font-bold text-6xl text-tanah/30 leading-none mb-4">{status}</p>

		<!-- Title -->
		<h1 class="heading text-2xl mb-3">{info.title}</h1>

		<!-- Description from info, or override with error message if specific -->
		<p class="prose-body text-bark/60 mb-8">
			{#if $page.error?.message && !STATUS_MESSAGES[status]}
				{$page.error.message}
			{:else}
				{info.description}
			{/if}
		</p>

		<!-- Actions -->
		<div class="flex items-center justify-center gap-3 flex-wrap">
			<a href={resolve('/')} class="btn-primary btn-md">
				<i class="i-ph-house" aria-hidden="true"></i>
				Kembali ke Beranda
			</a>
			<button onclick={() => history.back()} class="btn-soft btn-md">
				<i class="i-ph-arrow-left" aria-hidden="true"></i>
				Halaman Sebelumnya
			</button>
		</div>
	</div>
</div>
