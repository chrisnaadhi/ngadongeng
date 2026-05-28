<svelte:head>
	<title>Kontak — Ngadongeng</title>
</svelte:head>

<div class="bg-parchment/60 border-b border-kulit/30 py-16">
	<div class="container-md max-w-3xl">
		<p class="label text-tanah mb-3">KONTAK</p>
		<h1 class="heading text-4xl mb-4">Hubungi Kami</h1>
		<p class="prose-body text-bark/70">
			Untuk pertanyaan, kemitraan, laporan konten, atau sekadar menyapa — kami selalu senang
			mendengar kabar darimu.
		</p>
	</div>
</div>

<div class="container-md max-w-3xl py-16">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
		<!-- Contact info -->
		<div class="space-y-8">
			<h2 class="heading text-xl">Informasi Kontak</h2>
			{#each [{ icon: 'i-ph-envelope', label: 'Email', value: 'ngadongengsunda@gmail.com', href: 'mailto:ngadongengsunda@gmail.com' }, { icon: 'i-ph-phone', label: 'Telepon / WhatsApp', value: '081313237581', href: 'tel:081313237581' }, { icon: 'i-ph-map-pin', label: 'Alamat', value: 'Dusun Manglayang No. 1, RT/RW 2/01, Desa Mekarsari, Kec. Sukasari, Kab. Sumedang, Jawa Barat 45382', href: null }] as contact}
				<div class="flex items-start gap-4">
					<div
						class="w-10 h-10 rounded-lg bg-tanah/10 flex items-center justify-center flex-shrink-0"
					>
						<i class="{contact.icon} text-xl text-tanah" aria-hidden="true"></i>
					</div>
					<div>
						<p class="label mb-1">{contact.label}</p>
						{#if contact.href}
							<a href={contact.href} class="prose-body text-tanah hover:underline"
								>{contact.value}</a
							>
						{:else}
							<p class="prose-body text-bark/80">{contact.value}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Contact form -->
		<div class="card p-6">
			<h2 class="heading text-lg mb-6">Kirim Pesan</h2>
			<form
				class="space-y-4"
				onsubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div class="flex flex-col gap-1.5">
					<label for="nama" class="font-sans text-sm font-medium text-bark">Nama Lengkap</label>
					<input id="nama" type="text" class="input-base" placeholder="Nama kamu" required />
				</div>
				<div class="flex flex-col gap-1.5">
					<label for="email" class="font-sans text-sm font-medium text-bark">Alamat Email</label>
					<input id="email" type="email" class="input-base" placeholder="email@kamu.com" required />
				</div>
				<div class="flex flex-col gap-1.5">
					<label for="pesan" class="font-sans text-sm font-medium text-bark">Pesan</label>
					<textarea
						id="pesan"
						rows="5"
						class="input-base resize-y min-h-[120px]"
						placeholder="Tulis pesanmu di sini..."
						required
					></textarea>
				</div>
				<button type="submit" class="btn-primary btn-md w-full">Kirim Pesan</button>
			</form>
		</div>
	</div>
</div>
