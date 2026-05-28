import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = requirePermission(locals, 'story.create');
	const db = requireDb(locals);

	const stories = await db
		.select({
			id: schema.stories.id,
			slug: schema.stories.slug,
			title: schema.stories.title,
			status: schema.stories.status,
			format: schema.stories.format,
			category: schema.stories.category,
			viewCount: schema.stories.viewCount,
			createdAt: schema.stories.createdAt,
			updatedAt: schema.stories.updatedAt,
			reviewedAt: schema.stories.reviewedAt
		})
		.from(schema.stories)
		.where(eq(schema.stories.submittedBy, user.id!))
		.orderBy(desc(schema.stories.updatedAt))
		.all();

	return { stories };
};
