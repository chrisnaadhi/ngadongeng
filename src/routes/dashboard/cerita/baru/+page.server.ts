import { requireDb, requirePermission } from '$lib/server/auth-guard';
import { schema } from '$lib/server/db';
import type { NewStory } from '$lib/server/db/schema';
import { slugify } from '$lib/server/mappers';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	requirePermission(locals, 'story.create');
	return {};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const user = requirePermission(locals, 'story.create');
		const db = requireDb(locals);

		const fd = await request.formData();
		const title = fd.get('title')?.toString().trim() ?? '';
		const synopsis = fd.get('synopsis')?.toString().trim() ?? '';
		const moral = fd.get('moral')?.toString().trim() ?? '';
		const format = fd.get('format')?.toString() ?? '';
		const category = fd.get('category')?.toString() ?? '';
		const genre = fd.get('genre')?.toString() ?? '';
		const language = fd.get('language')?.toString() ?? '';
		const region = fd.get('region')?.toString().trim() ?? '';
		const content = fd.get('content')?.toString() ?? '';
		const embedUrl = fd.get('embedUrl')?.toString().trim() ?? '';
		const embedProvider = fd.get('embedProvider')?.toString() ?? '';
		const coverImageUrl = fd.get('coverImageUrl')?.toString().trim() ?? '';
		const tagsRaw = fd.get('tags')?.toString().trim() ?? '';
		const submitAction = fd.get('_action')?.toString(); // 'save' or 'submit'

		if (!title || !format || !category || !language) {
			return fail(400, { error: 'Judul, format, kategori, dan bahasa wajib diisi.' });
		}

		// Generate unique slug
		let slug = slugify(title);
		const existing = await db
			.select({ id: schema.stories.id })
			.from(schema.stories)
			.where(eq(schema.stories.slug, slug))
			.limit(1)
			.all();
		if (existing.length > 0) {
			slug = `${slug}-${Date.now()}`;
		}

		const tags = tagsRaw
			? JSON.stringify(
					tagsRaw
						.split(',')
						.map((t) => t.trim())
						.filter(Boolean)
				)
			: null;

		const status = submitAction === 'submit' ? 'pending_review' : 'draft';

		const storyData: NewStory = {
			slug,
			title,
			synopsis: synopsis || null,
			moral: moral || null,
			format: format as NewStory['format'],
			category: category as NewStory['category'],
			genre: (genre || null) as NewStory['genre'],
			language: language as NewStory['language'],
			region: region || null,
			content: content || null,
			embedUrl: embedUrl || null,
			embedProvider: (embedProvider || null) as NewStory['embedProvider'],
			coverImageUrl: coverImageUrl || null,
			tags,
			submittedBy: user.id,
			status: status as NewStory['status']
		};

		await db.insert(schema.stories).values(storyData).run();

		redirect(303, `/dashboard`);
	}
};
