<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<section class="py-16 bg-parchment/50">
	<div class="container-md">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<!-- Text -->
			<div>
				<p class="label text-tanah mb-3">TENTANG KAMI</p>
				<h2 class="heading text-2xl md:text-3xl mb-6">TBM Pabukon Ngadongeng</h2>
				<div class="prose-body text-bark/80 space-y-4">
					<p>
						Taman Bacaan Masyarakat (TBM) Pabukon Ngadongeng berdiri pada Desember 2019 di Dusun
						Manglayang, Mekarsari, Sukasari, Kabupaten Sumedang, Jawa Barat.
					</p>
					<p>
						TBM ini hadir sebagai ruang baca dan ruang budaya bagi masyarakat — terutama anak-anak —
						dengan fokus pada koleksi berbahasa dan bertemakan budaya Sunda. Dengan koleksi lebih
						dari 211 judul dan 514 eksemplar, Pabukon Ngadongeng menjadi salah satu jembatan antara
						tradisi lisan Sunda dan generasi muda.
					</p>
					<p>
						Platform Ngadongeng adalah perpanjangan digital dari misi TBM ini: mengarsipkan,
						menyebarkan, dan menghidupkan kembali dongeng Sunda dalam format yang relevan bagi
						pembaca masa kini.
					</p>
				</div>
				<div class="mt-8">
					<a href={resolve('/tentang')} class="btn-soft btn-md inline-flex"
						>Kenali Kami Lebih Jauh →</a
					>
				</div>
			</div>

			<!-- Visual placeholder / stats card -->
			<div class="bg-cream rounded-xl p-8 border border-kulit/30">
				<div class="space-y-6">
					{#each [['211+', 'Judul Koleksi'], ['514+', 'Eksemplar Buku'], ['2019', 'Tahun Berdiri'], ['Sukasari, Sumedang', 'Lokasi TBM']] as [value, label]}
						<div
							class="flex items-center gap-4 pb-4 border-b border-kulit/20 last:border-0 last:pb-0"
						>
							<p class="font-display font-bold text-2xl text-tanah w-24 flex-shrink-0">{value}</p>
							<p class="label text-bark/60">{label}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
