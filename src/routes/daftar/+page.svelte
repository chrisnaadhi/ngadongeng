<svelte:head>
	<title>Daftar Akun — Ngadongeng</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center py-16 px-4">
	<div class="w-full max-w-sm">
		<div class="text-center mb-8">
			<div class="w-12 h-12 rounded-full bg-tanah flex items-center justify-center mx-auto mb-4">
				<i class="i-ph-book-open text-cream text-xl" aria-hidden="true"></i>
			</div>
			<h1 class="heading text-2xl">Buat Akun Ngadongeng</h1>
			<p class="prose-body text-sm text-bark/60 mt-2">
				Sudah punya akun?
				<a href="/masuk" class="text-tanah font-semibold hover:underline">Masuk →</a>
			</p>
		</div>

		<form class="card p-6 space-y-4" onsubmit={(e) => e.preventDefault()}>
			<div class="flex flex-col gap-1.5">
				<label for="nama" class="font-sans text-sm font-medium text-bark">Nama Lengkap</label>
				<input
					id="nama"
					type="text"
					class="input-base"
					placeholder="Nama lengkap"
					required
					autocomplete="name"
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<label for="username" class="font-sans text-sm font-medium text-bark">Nama Pengguna</label>
				<input
					id="username"
					type="text"
					class="input-base"
					placeholder="nama-pengguna"
					required
					autocomplete="username"
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<label for="email" class="font-sans text-sm font-medium text-bark">Alamat Email</label>
				<input
					id="email"
					type="email"
					class="input-base"
					placeholder="email@kamu.com"
					required
					autocomplete="email"
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<label for="password" class="font-sans text-sm font-medium text-bark">Kata Sandi</label>
				<input
					id="password"
					type="password"
					class="input-base"
					placeholder="Minimal 8 karakter"
					required
					autocomplete="new-password"
					minlength="8"
				/>
			</div>
			<p class="prose-body text-xs text-bark/60">
				Dengan mendaftar, kamu menyetujui
				<a href="/kebijakan" class="text-tanah hover:underline">Kebijakan Penggunaan</a>
				Ngadongeng.
			</p>
			<button type="submit" class="btn-primary btn-md w-full">Buat Akun</button>
		</form>
	</div>
</div>
