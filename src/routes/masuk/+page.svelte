<script lang="ts">
	import { resolve } from '$app/paths';
</script>

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
				Masuk dengan Google untuk mulai menyimpan, mengirim, dan membaca cerita.
			</p>
		</div>

		<div class="card p-6 space-y-6">
			<p class="prose-body text-sm text-bark/70">
				Akun kamu akan dibuat otomatis saat pertama kali masuk dengan Google. Tidak perlu kata
				sandi.
			</p>
			<form method="post" action={resolve('/signin')} class="space-y-4">
				<input type="hidden" name="providerId" value="google" />
				<button
					type="submit"
					class="btn-primary btn-md w-full inline-flex items-center justify-center gap-3"
				>
					<i class="i-ph-google-logo text-xl" aria-hidden="true"></i>
					Masuk dengan Google
				</button>
			</form>
			<p class="prose-body text-xs text-bark/60">
				Belum punya akun? Cukup masuk sekali dengan Google dan akun akan dibuat otomatis.
			</p>
			<div class="text-center">
				<p class="font-sans text-sm text-bark/70">Atau</p>
				<a href={resolve('/daftar')} class="text-tanah font-semibold hover:underline"
					>Gunakan halaman daftar</a
				>
			</div>
		</div>
	</div>
</div>
