/**
 * Role-Based Access Control
 *
 * Permissions are flat string keys — easy to extend without touching
 * existing role definitions. To add a new permission:
 *   1. Add it to PERMISSIONS
 *   2. Add it to the relevant role(s) in ROLE_PERMISSIONS
 *
 * To add a new role:
 *   1. Add to the ROLES tuple and Role type
 *   2. Add a ROLE_PERMISSIONS entry
 */

// ── Permission registry ───────────────────────────────────────────────────────

export const PERMISSIONS = {
	// Story — own
	'story.create': 'Submit a new story',
	'story.own.read': 'View own stories (any status)',
	'story.own.update': 'Edit own draft or rejected story',
	'story.own.delete': 'Delete own draft story',
	'story.own.submit': 'Send own story for admin review',

	// Story — any (admin+)
	'story.any.read': 'View any story regardless of status',
	'story.any.update': 'Edit any story',
	'story.any.delete': 'Delete any story',
	'story.review': 'Approve, reject, or request changes on a story',
	'story.publish': 'Set a story status to published',

	// User management (superadmin only)
	'user.list': 'List all user accounts',
	'user.role.update': "Change another user's role (except superadmin)",
	'user.suspend': 'Suspend or unsuspend a user account',

	// Panel access
	'panel.admin': 'Access the admin review panel',
	'panel.superadmin': 'Access the superadmin management panel'
} as const;

export type Permission = keyof typeof PERMISSIONS;

// ── Role hierarchy ────────────────────────────────────────────────────────────

export const ROLES = ['reader', 'contributor', 'admin', 'superadmin'] as const;
export type Role = (typeof ROLES)[number];

/** Permissions granted to each role. Roles are NOT cumulative — list all. */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
	reader: [],

	contributor: [
		'story.create',
		'story.own.read',
		'story.own.update',
		'story.own.delete',
		'story.own.submit'
	],

	admin: [
		'story.create',
		'story.own.read',
		'story.own.update',
		'story.own.delete',
		'story.own.submit',
		'story.any.read',
		'story.any.update',
		'story.review',
		'story.publish',
		'user.list',
		'panel.admin'
	],

	superadmin: [
		'story.create',
		'story.own.read',
		'story.own.update',
		'story.own.delete',
		'story.own.submit',
		'story.any.read',
		'story.any.update',
		'story.any.delete',
		'story.review',
		'story.publish',
		'user.list',
		'user.role.update',
		'user.suspend',
		'panel.admin',
		'panel.superadmin'
	]
};

// ── Helper functions ──────────────────────────────────────────────────────────

export function hasPermission(role: Role | string, permission: Permission): boolean {
	return (ROLE_PERMISSIONS[role as Role] ?? []).includes(permission);
}

export function hasAnyPermission(role: Role | string, permissions: Permission[]): boolean {
	return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: Role | string, permissions: Permission[]): boolean {
	return permissions.every((p) => hasPermission(role, p));
}

/** Returns true if roleA is strictly higher than roleB in the hierarchy. */
export function isHigherRole(roleA: Role | string, roleB: Role | string): boolean {
	return ROLES.indexOf(roleA as Role) > ROLES.indexOf(roleB as Role);
}
