<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const s = data.stats;
	const stories = s.stories as Record<string, number>;

	const statCards = [
		{
			label: 'Total Pengguna',
			value: s.users,
			icon: 'i-ph-users-bold',
			color: 'bg-cai/15 text-cai'
		},
		{
			label: 'Kontributor',
			value: s.contributors,
			icon: 'i-ph-pencil-line-bold',
			color: 'bg-padi/25 text-bark'
		},
		{
			label: 'Cerita Terbit',
			value: stories.published ?? 0,
			icon: 'i-ph-book-open-bold',
			color: 'bg-success/15 text-success'
		},
		{
			label: 'Menunggu Ulasan',
			value: stories.pending_review ?? 0,
			icon: 'i-ph-clock-bold',
			color: 'bg-tanah/15 text-tanah'
		}
	];
</script>

<div class="space-y-6">
	<div>
		<h1 class="heading text-2xl">Ikhtisar Sistem</h1>
		<p class="label mt-1">Statistik platform secara keseluruhan.</p>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
		{#each statCards as card}
			<div class="panel-card p-5">
				<div class="flex items-start justify-between mb-3">
					<div class="w-10 h-10 rounded-lg {card.color} flex items-center justify-center">
						<span class="{card.icon} text-xl" aria-hidden="true"></span>
					</div>
				</div>
				<p class="heading text-3xl mb-1">{card.value}</p>
				<p class="label">{card.label}</p>
			</div>
		{/each}
	</div>

	<!-- Story status breakdown -->
	<div class="panel-card p-5">
		<h2 class="heading text-base mb-4">Distribusi Status Cerita</h2>
		<div class="flex flex-wrap gap-3">
			{#each Object.entries(stories) as [status, count]}
				<div class="flex items-center gap-2 bg-bark/5 rounded-lg px-3 py-2">
					<span class="font-mono text-sm font-semibold text-bark">{count}</span>
					<span class="label capitalize">{status.replace('_', ' ')}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-wrap gap-3">
		<a href={resolve('/admin/pengguna')} class="btn-primary btn-sm">
			<span class="i-ph-users-bold text-sm" aria-hidden="true"></span>
			Kelola Pengguna
		</a>
		<a href={resolve('/ulasan')} class="btn-secondary btn-sm">
			<span class="i-ph-stack-bold text-sm" aria-hidden="true"></span>
			Panel Ulasan
		</a>
	</div>
</div>
