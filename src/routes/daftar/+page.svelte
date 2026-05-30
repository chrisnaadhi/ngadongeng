<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Daftar Akun — Ngadongeng</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center py-16 px-4">
	<div class="w-full max-w-sm">
		<div class="text-center mb-8">
			<div class="w-12 h-12 rounded-full bg-tanah flex items-center justify-center mx-auto mb-4">
				<i class="i-ph-book-open text-cream text-xl" aria-hidden="true"></i>
			</div>
			<h1 class="heading text-2xl">Daftar Akun Ngadongeng</h1>
			<p class="prose-body text-sm text-bark/60 mt-2">
				Daftar sekarang dengan Google. Akun akan dibuat otomatis pada login pertama.
			</p>
		</div>

		<div class="card p-6 space-y-6">
			<p class="prose-body text-sm text-bark/70">
				Tidak perlu kata sandi. Cukup gunakan akun Google untuk masuk dan mulai berbagi cerita.
			</p>
			<form method="post" action={resolve('/signin')} class="space-y-4">
				<input type="hidden" name="providerId" value="google" />
				<button
					type="submit"
					class="btn-primary btn-md w-full inline-flex items-center justify-center gap-3"
				>
					<i class="i-ph-google-logo text-xl" aria-hidden="true"></i>
					Daftar dengan Google
				</button>
			</form>
			<p class="prose-body text-xs text-bark/60">
				Sudah punya akun? <a href={resolve('/masuk')} class="text-tanah hover:underline"
					>Masuk dengan Google</a
				>.
			</p>
		</div>
	</div>
</div>
