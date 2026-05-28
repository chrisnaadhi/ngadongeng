import { schema } from '$lib/server/db';
import { mapStory } from '$lib/server/mappers';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.db) {
		return { featuredStories: [], recentStories: [], stats: null };
	}

	const db = locals.db;

	const [featured, recent, storyCount, contributorCount] = await Promise.all([
		db
			.select()
			.from(schema.stories)
			.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
			.where(and(eq(schema.stories.status, 'published'), eq(schema.stories.featured, true)))
			.orderBy(desc(schema.stories.publishedAt))
			.limit(3)
			.all(),

		db
			.select()
			.from(schema.stories)
			.leftJoin(schema.contributors, eq(schema.stories.contributorId, schema.contributors.id))
			.where(eq(schema.stories.status, 'published'))
			.orderBy(desc(schema.stories.publishedAt))
			.limit(8)
			.all(),

		db
			.select({ id: schema.stories.id })
			.from(schema.stories)
			.where(eq(schema.stories.status, 'published'))
			.all()
			.then((r) => r.length),

		db
			.select({ id: schema.contributors.id })
			.from(schema.contributors)
			.all()
			.then((r) => r.length)
	]);

	return {
		featuredStories: featured.map((r) => mapStory(r.stories, r.contributors)),
		recentStories: recent.map((r) => mapStory(r.stories, r.contributors)),
		stats: {
			storyCount,
			contributorCount
		}
	};
};
