import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	requirePermission(locals, 'panel.admin');
	const db = requireDb(locals);

	const pending = await db
		.select({
			id: schema.stories.id,
			slug: schema.stories.slug,
			title: schema.stories.title,
			format: schema.stories.format,
			category: schema.stories.category,
			submittedAt: schema.stories.updatedAt,
			submitterName: schema.users.name,
			submitterEmail: schema.users.email
		})
		.from(schema.stories)
		.leftJoin(schema.users, eq(schema.stories.submittedBy, schema.users.id))
		.where(eq(schema.stories.status, 'pending_review'))
		.orderBy(schema.stories.updatedAt)
		.all();

	return { pending };
};
