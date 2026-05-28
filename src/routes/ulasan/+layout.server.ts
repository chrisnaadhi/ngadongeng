import { requirePermission } from '$lib/server/auth-guard';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	requirePermission(locals, 'panel.admin');
	return { currentPath: url.pathname };
};
