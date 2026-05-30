<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let format = $state('teks');

	const FORMAT_OPTIONS = [
		{ value: 'teks', label: 'Teks (Prosa)' },
		{ value: 'komik', label: 'Komik (Embed)' },
		{ value: 'audio', label: 'Audio' },
		{ value: 'audiovisual', label: 'Audiovisual / Video' }
	];
	const CATEGORY_OPTIONS = [
		{ value: 'binatang', label: 'Binatang' },
		{ value: 'dewa-dewi', label: 'Dewa-Dewi' },
		{ value: 'manusia', label: 'Manusia' },
		{ value: 'asal-usul', label: 'Asal-Usul' },
		{ value: 'sejarah', label: 'Sejarah' },
		{ value: 'jenaka', label: 'Jenaka' },
		{ value: 'legenda', label: 'Legenda' }
	];
	const GENRE_OPTIONS = [
		{ value: 'fabel', label: 'Fabel' },
		{ value: 'legenda', label: 'Legenda' },
		{ value: 'mite', label: 'Mite' },
		{ value: 'sage', label: 'Sage' },
		{ value: 'dongeng-anak', label: 'Dongeng Anak' },
		{ value: 'pantun', label: 'Pantun' },
		{ value: 'guguritan', label: 'Guguritan' },
		{ value: 'parabel', label: 'Parabel' },
		{ value: 'lainnya', label: 'Lainnya' }
	];
	const LANGUAGE_OPTIONS = [
		{ value: 'sunda', label: 'Sunda' },
		{ value: 'sunda-buhun', label: 'Sunda Buhun' },
		{ value: 'indonesia', label: 'Indonesia' },
		{ value: 'sunda-indonesia', label: 'Sunda & Indonesia' }
	];
	const EMBED_PROVIDERS = [
		{ value: 'youtube', label: 'YouTube' },
		{ value: 'gdrive', label: 'Google Drive' },
		{ value: 'canva', label: 'Canva' },
		{ value: 'soundcloud', label: 'SoundCloud' },
		{ value: 'spotify', label: 'Spotify' },
		{ value: 'other', label: 'Lainnya' }
	];
</script>

<div class="space-y-6">
	<div>
		<h1 class="heading text-2xl">Kirim Cerita Baru</h1>
		<p class="label mt-1">Lengkapi detail cerita lalu kirim untuk ditinjau.</p>
	</div>

	{#if form?.error}
		<div class="bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm">
			{form.error}
		</div>
	{/if}

	<form method="POST" class="space-y-5">
		<!-- Basic Info -->
		<section class="panel-card p-6 space-y-5">
			<h2 class="heading text-base border-b border-kulit/30 pb-3">Informasi Dasar</h2>

			<div class="space-y-1.5">
				<label for="title" class="block text-sm font-semibold text-bark">Judul Cerita *</label>
				<input
					id="title"
					name="title"
					type="text"
					required
					placeholder="Contoh: Si Kancil dan Buaya"
					class="input-base"
				/>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div class="space-y-1.5">
					<label for="format" class="block text-sm font-semibold text-bark">Format *</label>
					<select id="format" name="format" bind:value={format} required class="input-base">
						{#each FORMAT_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div class="space-y-1.5">
					<label for="category" class="block text-sm font-semibold text-bark">Kategori *</label>
					<select id="category" name="category" required class="input-base">
						{#each CATEGORY_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div class="space-y-1.5">
					<label for="language" class="block text-sm font-semibold text-bark">Bahasa *</label>
					<select id="language" name="language" required class="input-base">
						{#each LANGUAGE_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="space-y-1.5">
					<label for="genre" class="block text-sm font-semibold text-bark">Genre</label>
					<select id="genre" name="genre" class="input-base">
						<option value="">— Pilih genre —</option>
						{#each GENRE_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>
				<div class="space-y-1.5">
					<label for="region" class="block text-sm font-semibold text-bark">Asal Daerah</label>
					<input
						id="region"
						name="region"
						type="text"
						placeholder="Contoh: Sumedang, Priangan Timur"
						class="input-base"
					/>
				</div>
			</div>
		</section>

		<!-- Synopsis & Moral -->
		<section class="panel-card p-6 space-y-5">
			<h2 class="heading text-base border-b border-kulit/30 pb-3">Deskripsi & Pesan</h2>
			<div class="space-y-1.5">
				<label for="synopsis" class="block text-sm font-semibold text-bark">Sinopsis</label>
				<textarea
					id="synopsis"
					name="synopsis"
					rows="3"
					placeholder="Ringkasan singkat isi cerita..."
					class="input-base resize-y"
				></textarea>
			</div>
			<div class="space-y-1.5">
				<label for="moral" class="block text-sm font-semibold text-bark">Pesan Moral</label>
				<textarea
					id="moral"
					name="moral"
					rows="2"
					placeholder="Nilai atau pesan yang terkandung dalam cerita..."
					class="input-base resize-y"
				></textarea>
			</div>
			<div class="space-y-1.5">
				<label for="tags" class="block text-sm font-semibold text-bark">Tag</label>
				<input
					id="tags"
					name="tags"
					type="text"
					placeholder="kancil, binatang, jenaka (pisahkan dengan koma)"
					class="input-base"
				/>
				<p class="font-mono text-xs text-bark/50 mt-1">Pisahkan tag dengan koma.</p>
			</div>
		</section>

		<!-- Content -->
		<section class="panel-card p-6 space-y-5">
			<h2 class="heading text-base border-b border-kulit/30 pb-3">Konten Cerita</h2>

			{#if format === 'teks'}
				<div class="space-y-1.5">
					<label for="content" class="block text-sm font-semibold text-bark">Teks Cerita</label>
					<textarea
						id="content"
						name="content"
						rows="18"
						placeholder="Tulis atau tempel teks cerita di sini. Markdown didukung."
						class="input-base font-mono text-sm resize-y"
					></textarea>
				</div>
			{:else}
				<div class="space-y-4">
					<div class="space-y-1.5">
						<label for="embedUrl" class="block text-sm font-semibold text-bark">URL Embed</label>
						<input
							id="embedUrl"
							name="embedUrl"
							type="url"
							placeholder="https://..."
							class="input-base"
						/>
						<p class="font-mono text-xs text-bark/50 mt-1">
							{format === 'komik'
								? 'Tautan embed Canva atau Google Drive'
								: format === 'audio'
									? 'Tautan Google Drive, SoundCloud, atau Spotify'
									: 'Tautan YouTube atau Google Drive'}
						</p>
					</div>
					<div class="space-y-1.5">
						<label for="embedProvider" class="block text-sm font-semibold text-bark">Platform</label
						>
						<select id="embedProvider" name="embedProvider" class="input-base">
							<option value="">— Pilih platform —</option>
							{#each EMBED_PROVIDERS as opt}
								<option value={opt.value}>{opt.label}</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}

			<div class="space-y-1.5">
				<label for="coverImageUrl" class="block text-sm font-semibold text-bark"
					>URL Gambar Sampul</label
				>
				<input
					id="coverImageUrl"
					name="coverImageUrl"
					type="url"
					placeholder="https://..."
					class="input-base"
				/>
				<p class="font-mono text-xs text-bark/50 mt-1">URL gambar publik untuk thumbnail cerita.</p>
			</div>
		</section>

		<!-- Actions -->
		<div
			class="panel-card px-5 py-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-3"
		>
			<a href={resolve('/dashboard')} class="btn-soft btn-sm w-full sm:w-auto justify-center">
				← Batal
			</a>
			<div class="flex gap-3 w-full sm:w-auto">
				<button
					type="submit"
					name="_action"
					value="save"
					class="btn-soft btn-sm flex-1 sm:flex-none"
				>
					Simpan Draf
				</button>
				<button
					type="submit"
					name="_action"
					value="submit"
					class="btn-primary btn-sm flex-1 sm:flex-none"
				>
					Kirim untuk Ditinjau
				</button>
			</div>
		</div>
	</form>
</div>
