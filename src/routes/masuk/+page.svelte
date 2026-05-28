<svelte:head>
	<title>Masuk — Ngadongeng</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center py-16 px-4">
	<div class="w-full max-w-sm">
		<!-- Logo -->
		<div class="text-center mb-8">
			<div class="w-12 h-12 rounded-full bg-tanah flex items-center justify-center mx-auto mb-4">
				<i class="i-ph-book-open text-cream text-xl" aria-hidden="true"></i>
			</div>
			<h1 class="heading text-2xl">Masuk ke Ngadongeng</h1>
			<p class="prose-body text-sm text-bark/60 mt-2">
				Belum punya akun?
				<a href="/daftar" class="text-tanah font-semibold hover:underline">Daftar gratis →</a>
			</p>
		</div>

		<!-- Form -->
		<form class="card p-6 space-y-4" onsubmit={(e) => e.preventDefault()}>
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
				<div class="flex justify-between items-center">
					<label for="password" class="font-sans text-sm font-medium text-bark">Kata Sandi</label>
					<a href="/lupa-sandi" class="font-sans text-xs text-tanah hover:underline"
						>Lupa kata sandi?</a
					>
				</div>
				<input
					id="password"
					type="password"
					class="input-base"
					placeholder="••••••••"
					required
					autocomplete="current-password"
				/>
			</div>
			<button type="submit" class="btn-primary btn-md w-full mt-2">Masuk</button>
		</form>
	</div>
</div>
