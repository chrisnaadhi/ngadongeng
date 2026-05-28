import { schema } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.db) {
		return { stats: null };
	}

	const [storyCount, contributorCount] = await Promise.all([
		locals.db
			.select({ id: schema.stories.id })
			.from(schema.stories)
			.where(eq(schema.stories.status, 'published'))
			.all()
			.then((r) => r.length),
		locals.db
			.select({ id: schema.contributors.id })
			.from(schema.contributors)
			.all()
			.then((r) => r.length)
	]);

	return {
		stats: { storyCount, contributorCount }
	};
};
