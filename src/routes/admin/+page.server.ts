import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	requirePermission(locals, 'panel.superadmin');
	const db = requireDb(locals);

	const [userCount, storyStats, contributorCount] = await Promise.all([
		db
			.select({ count: sql<number>`count(*)` })
			.from(schema.users)
			.get(),

		db
			.select({ status: schema.stories.status, count: sql<number>`count(*)` })
			.from(schema.stories)
			.groupBy(schema.stories.status)
			.all(),

		db
			.select({ count: sql<number>`count(*)` })
			.from(schema.contributors)
			.get()
	]);

	return {
		stats: {
			users: userCount?.count ?? 0,
			contributors: contributorCount?.count ?? 0,
			stories: Object.fromEntries(storyStats.map((s) => [s.status, s.count]))
		}
	};
};
