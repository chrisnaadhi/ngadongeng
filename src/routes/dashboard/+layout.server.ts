import { requireAuth } from '$lib/server/auth-guard';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	requireAuth(locals);
	return {
		currentPath: url.pathname
	};
};
