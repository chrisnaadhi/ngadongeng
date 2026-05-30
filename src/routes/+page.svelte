<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		AboutSection,
		CategoryShowcase,
		FeaturedStories,
		HeroSection,
		PreFooterCTA,
		StoryCategorySection
	} from '$lib/components/sections';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let featuredStories = $derived(
		data.featuredStories.length ? data.featuredStories : data.recentStories.slice(0, 3)
	);
	let recentStories = $derived(data.recentStories);
	let stats = $derived({
		totalCerita: data.stats?.storyCount ?? 0,
		totalKontributor: data.stats?.contributorCount ?? 0,
		totalKegiatan: 0,
		tahunBerjalan: new Date().getFullYear() - 2020
	});
</script>

<svelte:head>
	<title>Ngadongeng — Cerita Rakyat Sunda, untuk Semua</title>
</svelte:head>

<HeroSection
	totalCerita={stats.totalCerita}
	totalKontributor={stats.totalKontributor}
	totalKegiatan={stats.totalKegiatan}
	tahunBerjalan={stats.tahunBerjalan}
/>

<FeaturedStories stories={featuredStories.length ? featuredStories : recentStories.slice(0, 3)} />

<CategoryShowcase />

<StoryCategorySection />

<!-- Community section -->
<section class="py-16">
	<div class="container-md">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<div>
				<p class="label text-tanah mb-3">KOMUNITAS NGADONGENG</p>
				<h2 class="heading text-2xl md:text-3xl mb-6">Cerita dari Komunitas Kita</h2>
				<p class="prose-body text-bark/70 mb-4">
					Ngadongeng bukan hanya milik TBM Pabukon — ini milik siapa pun yang punya cerita untuk
					dibagikan. Bergabung dan jadilah bagian dari upaya melestarikan budaya Sunda.
				</p>
				<a href={resolve('/kontribusi')} class="btn-primary btn-md inline-flex mt-2"
					>Cara Berkontribusi →</a
				>
			</div>
			<div class="flex flex-col gap-3">
				{#each recentStories.slice(0, 3) as story (story.id)}
					<a
						href={resolve('/cerita/' + story.slug)}
						class="card-hover flex gap-4 p-4 rounded-lg no-underline"
					>
						<div
							class="w-14 h-14 rounded-lg bg-parchment flex-shrink-0 flex items-center justify-center"
						>
							<i class="i-ph-book-open text-xl text-tanah/40" aria-hidden="true"></i>
						</div>
						<div class="min-w-0">
							<p class="heading text-sm line-clamp-1">{story.title}</p>
							<p class="prose-body text-xs text-bark/50 line-clamp-1 mt-1">{story.excerpt ?? ''}</p>
							<p class="font-mono text-xs text-kulit mt-1">{story.author.displayName}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<AboutSection />

<PreFooterCTA />
