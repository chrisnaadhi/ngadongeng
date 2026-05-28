import { error, redirect } from '@sveltejs/kit';
import { hasAllPermissions, type Permission, type Role } from './rbac';

type SessionUser = {
	id: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	role?: string;
};

/**
 * Asserts the user is authenticated. Redirects to /masuk if not.
 * Returns the session user on success.
 */
export function requireAuth(locals: App.Locals, redirectTo = '/masuk'): SessionUser {
	if (!locals.session?.user) {
		redirect(303, redirectTo);
	}
	const user = locals.session.user as SessionUser;
	if ((user as { suspended?: boolean }).suspended) {
		error(403, 'Akun Anda telah ditangguhkan. Hubungi admin untuk info lebih lanjut.');
	}
	return user;
}

/**
 * Asserts the user has all of the given permissions.
 * Redirects to /masuk if unauthenticated; throws 403 if insufficient role.
 */
export function requirePermission(locals: App.Locals, ...permissions: Permission[]): SessionUser {
	const user = requireAuth(locals);
	const role = (user.role ?? 'reader') as Role;

	if (!hasAllPermissions(role, permissions)) {
		error(403, 'Akses ditolak. Anda tidak memiliki izin untuk halaman ini.');
	}
	return user;
}

/**
 * Returns the current user's role, defaulting to 'reader'.
 */
export function getRole(locals: App.Locals): Role {
	return ((locals.session?.user as SessionUser | undefined)?.role ?? 'reader') as Role;
}

/**
 * Asserts the DB binding is available. Throws 503 if not
 * (happens when D1 is not configured in wrangler.toml yet).
 */
export function requireDb(locals: App.Locals) {
	if (!locals.db) {
		error(503, 'Database niet beschikbaar. Controleer de wrangler.toml configuratie.');
	}
	return locals.db;
}
