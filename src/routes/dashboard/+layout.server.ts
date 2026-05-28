import { requirePermission } from '$lib/server/auth-guard';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	requirePermission(locals, 'story.create');
	return {
		currentPath: url.pathname
	};
};
