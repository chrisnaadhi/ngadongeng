<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const ROLE_OPTIONS = [
		{ value: 'reader', label: 'Pembaca' },
		{ value: 'contributor', label: 'Kontributor' },
		{ value: 'admin', label: 'Admin' }
	];
	const ROLE_CLASS: Record<string, string> = {
		reader: 'bg-bark/10 text-bark',
		contributor: 'bg-padi/25 text-bark',
		admin: 'bg-cai/20 text-cai',
		superadmin: 'bg-night text-cream'
	};
	const ROLE_LABEL: Record<string, string> = {
		reader: 'Pembaca',
		contributor: 'Kontributor',
		admin: 'Admin',
		superadmin: 'Superadmin'
	};

	function formatDate(d: Date | null | undefined) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(d));
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="heading text-2xl">Kelola Pengguna</h1>
		<p class="label mt-1">{data.users.length} pengguna terdaftar</p>
	</div>

	{#if form?.error}
		<div class="bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm">
			{form.error}
		</div>
	{/if}

	<div class="panel-card overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead class="border-b border-kulit/30 bg-bark/5">
					<tr>
						<th class="px-4 py-3 text-left label">Pengguna</th>
						<th class="px-4 py-3 text-left label">Peran</th>
						<th class="px-4 py-3 text-left label hidden sm:table-cell">Status</th>
						<th class="px-4 py-3 text-left label hidden md:table-cell">Bergabung</th>
						<th class="px-4 py-3 text-left label">Tindakan</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-kulit/20">
					{#each data.users as user}
						<tr class="hover:bg-cream/50 transition-colors {user.suspended ? 'opacity-55' : ''}">
							<td class="px-4 py-3.5">
								<p class="font-medium text-bark">{user.name ?? '—'}</p>
								<p class="font-mono text-xs text-bark/55">{user.email}</p>
							</td>
							<td class="px-4 py-3.5">
								<span
									class="px-2.5 py-0.5 rounded-full text-xs font-medium {ROLE_CLASS[
										user.role ?? 'reader'
									]}"
								>
									{ROLE_LABEL[user.role ?? 'reader'] ?? user.role}
								</span>
							</td>
							<td class="px-4 py-3.5 hidden sm:table-cell">
								{#if user.suspended}
									<span class="font-mono text-xs text-danger font-medium">Ditangguhkan</span>
								{:else}
									<span class="font-mono text-xs text-success">Aktif</span>
								{/if}
							</td>
							<td class="px-4 py-3.5 font-mono text-xs text-bark/55 hidden md:table-cell"
								>{formatDate(user.createdAt)}</td
							>
							<td class="px-4 py-3.5">
								{#if user.role !== 'superadmin'}
									<div class="flex items-center gap-2 flex-wrap">
										<!-- Role change -->
										<form method="POST" action="?/updateRole" class="flex items-center gap-1.5">
											<input type="hidden" name="userId" value={user.id} />
											<select
												name="role"
												class="border border-kulit/50 rounded-md px-2 py-1 text-xs text-bark bg-cream focus:outline-none focus:border-cai focus:ring-2 focus:ring-cai/20"
											>
												{#each ROLE_OPTIONS as opt}
													<option value={opt.value} selected={opt.value === user.role}
														>{opt.label}</option
													>
												{/each}
											</select>
											<button
												type="submit"
												class="px-2.5 py-1 rounded-md bg-night text-cream text-xs font-medium hover:bg-night/80 transition-colors"
											>
												Ubah
											</button>
										</form>

										<!-- Suspend toggle -->
										<form method="POST" action="?/toggleSuspend">
											<input type="hidden" name="userId" value={user.id} />
											<button
												type="submit"
												class="px-2.5 py-1 rounded-md text-xs font-medium border transition-colors
													{user.suspended
													? 'border-success/50 text-success hover:bg-success/10'
													: 'border-danger/40 text-danger hover:bg-danger/10'}"
											>
												{user.suspended ? 'Aktifkan' : 'Tangguhkan'}
											</button>
										</form>
									</div>
								{:else}
									<span class="font-mono text-xs text-bark/40 italic">Dilindungi</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
