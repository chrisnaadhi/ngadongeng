/**
 * Maps Drizzle DB types → DongengStory (for use in public-facing components).
 * Admin/dashboard pages can use the raw DB types directly.
 */
import type { Contributor, Story } from '$lib/server/db/schema';
import type {
	ContributorRole,
	DongengCategory,
	DongengFormat,
	DongengGenre,
	DongengLanguage,
	DongengRegion,
	DongengStory
} from '$lib/types';

const FALLBACK_AUTHOR = {
	username: 'pabukon-ngadongeng',
	displayName: 'TBM Pabukon Ngadongeng',
	role: 'tbm' as ContributorRole
};

export function mapStory(story: Story, contributor?: Contributor | null): DongengStory {
	const parsedTags = story.tags
		? (() => {
				try {
					return JSON.parse(story.tags) as string[];
				} catch {
					return story.tags.split(',').map((t) => t.trim());
				}
			})()
		: undefined;

	const author = contributor
		? {
				username: contributor.id,
				displayName: contributor.name,
				avatarUrl: contributor.avatarUrl ?? undefined,
				role: contributor.role as ContributorRole
			}
		: FALLBACK_AUTHOR;

	return {
		id: story.id,
		slug: story.slug,
		title: story.title,
		excerpt: story.synopsis ?? undefined,
		coverUrl: story.coverImageUrl ?? undefined,
		format: story.format as DongengFormat,
		category: story.category as DongengCategory,
		genre: (story.genre ?? 'lainnya') as DongengGenre,
		language: story.language as DongengLanguage,
		region: (story.region ?? 'sunda-umum') as DongengRegion,
		author,
		publishedAt: story.publishedAt?.toISOString() ?? story.createdAt.toISOString(),
		featured: story.featured,
		viewCount: story.viewCount,
		synopsis: story.synopsis ?? undefined,
		moralMessage: story.moral ?? undefined,
		bodyText: story.content ?? undefined,
		// Format-specific media
		audioSrc: story.format === 'audio' ? (story.embedUrl ?? undefined) : undefined,
		videoSrc: story.format === 'audiovisual' ? (story.embedUrl ?? undefined) : undefined,
		tags: parsedTags,
		// Pass through embed fields for komik/iframe rendering
		embedUrl: story.embedUrl ?? undefined,
		embedProvider: story.embedProvider ?? undefined
	};
}

export function mapStories(
	rows: Array<{ stories: Story; contributors: Contributor | null }>
): DongengStory[] {
	return rows.map((r) => mapStory(r.stories, r.contributors));
}

/** Generates a URL-safe slug from a story title. */
export function slugify(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80);
}
