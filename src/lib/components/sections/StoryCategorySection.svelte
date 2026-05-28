<script lang="ts">
	const categories = [
		{
			href: '/cerita?category=binatang',
			icon: 'i-ph-paw-print',
			title: 'Dongeng Tokoh Binatang',
			body: 'Dongeng mengenai cerita yang terfokus pada tokoh-tokoh binatang — dari kancil yang cerdik, buaya yang serakah, hingga burung yang bijaksana.',
			cta: 'Cari & Baca →'
		},
		{
			href: '/cerita?category=dewa-dewi',
			icon: 'i-ph-star',
			title: 'Dongeng Tokoh Dewa-Dewi',
			body: 'Dongeng mengenai cerita yang terfokus pada tokoh-tokoh dewa-dewi — mitos dan kisah sakral dari kepercayaan Sunda Wiwitan dan tradisi leluhur.',
			cta: 'Cari & Baca →'
		},
		{
			href: '/cerita?category=manusia',
			icon: 'i-ph-person',
			title: 'Dongeng Manusia & Asal-Usul Tempat',
			body: 'Dongeng mengenai cerita yang terfokus pada tokoh manusia dan legenda asal-usul tempat — dari Sangkuriang hingga Ciung Wanara.',
			cta: 'Cari & Baca →'
		}
	];
</script>

<section class="py-16">
	<div class="container-md">
		<div class="mb-10">
			<p class="label text-tanah mb-2">JENIS DONGENG</p>
			<h2 class="heading text-2xl md:text-3xl">Cari berdasarkan Tokoh dan Tema</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each categories as cat}
				<a href={cat.href} class="card-hover p-6 flex flex-col gap-4 no-underline rounded-lg group">
					<div class="w-12 h-12 rounded-lg bg-tanah/10 flex items-center justify-center">
						<i class="{cat.icon} text-2xl text-tanah" aria-hidden="true"></i>
					</div>
					<h3 class="heading text-lg">{cat.title}</h3>
					<p class="prose-body text-sm text-bark/60 flex-1">{cat.body}</p>
					<p class="font-sans text-sm font-semibold text-tanah group-hover:underline">{cat.cta}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
