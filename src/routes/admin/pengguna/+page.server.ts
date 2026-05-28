import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import { isHigherRole, ROLES, type Role } from '$lib/server/rbac';
import { fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	requirePermission(locals, 'user.list');
	const db = requireDb(locals);

	const users = await db
		.select({
			id: schema.users.id,
			name: schema.users.name,
			email: schema.users.email,
			role: schema.users.role,
			suspended: schema.users.suspended,
			createdAt: schema.users.createdAt
		})
		.from(schema.users)
		.orderBy(desc(schema.users.createdAt))
		.all();

	return { users };
};

export const actions: Actions = {
	updateRole: async ({ locals, request }) => {
		const admin = requirePermission(locals, 'user.role.update');
		const db = requireDb(locals);

		const fd = await request.formData();
		const targetId = fd.get('userId')?.toString();
		const newRole = fd.get('role')?.toString();

		if (!targetId || !newRole || !ROLES.includes(newRole as Role)) {
			return fail(400, { error: 'Data tidak valid.' });
		}

		// Cannot assign superadmin role (must be done via DB directly)
		if (newRole === 'superadmin') {
			return fail(403, {
				error: 'Penetapan peran superadmin hanya dapat dilakukan melalui database.'
			});
		}

		// Cannot change role of a user with equal or higher role
		const [target] = await db
			.select({ role: schema.users.role })
			.from(schema.users)
			.where(eq(schema.users.id, targetId))
			.limit(1)
			.all();

		if (!target) return fail(404, { error: 'Pengguna tidak ditemukan.' });

		const adminRole = (locals.session?.user as { role?: string })?.role ?? 'reader';
		if (!isHigherRole(adminRole, target.role)) {
			return fail(403, {
				error:
					'Anda tidak dapat mengubah peran pengguna dengan tingkat yang sama atau lebih tinggi.'
			});
		}

		await db
			.update(schema.users)
			.set({ role: newRole as never })
			.where(eq(schema.users.id, targetId))
			.run();

		return { success: true };
	},

	toggleSuspend: async ({ locals, request }) => {
		const admin = requirePermission(locals, 'user.suspend');
		const db = requireDb(locals);

		const fd = await request.formData();
		const targetId = fd.get('userId')?.toString();

		if (!targetId) return fail(400, { error: 'ID pengguna diperlukan.' });

		const [target] = await db
			.select({ role: schema.users.role, suspended: schema.users.suspended })
			.from(schema.users)
			.where(eq(schema.users.id, targetId))
			.limit(1)
			.all();

		if (!target) return fail(404, { error: 'Pengguna tidak ditemukan.' });

		// Cannot suspend another superadmin
		if (target.role === 'superadmin') {
			return fail(403, { error: 'Tidak dapat menangguhkan superadmin.' });
		}

		await db
			.update(schema.users)
			.set({ suspended: !target.suspended })
			.where(eq(schema.users.id, targetId))
			.run();

		return { success: true };
	}
};
