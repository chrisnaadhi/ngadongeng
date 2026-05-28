import type { D1Database } from '@cloudflare/workers-types';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

/**
 * Create a Drizzle D1 client bound to the given D1Database instance.
 * Call this once per request using `event.platform.env.DB`.
 *
 * @example
 * // In a +page.server.ts or +server.ts:
 * export const load: PageServerLoad = async ({ locals }) => {
 *   const stories = await locals.db
 *     .select()
 *     .from(schema.stories)
 *     .where(eq(schema.stories.status, 'published'))
 *     .all();
 *   return { stories };
 * };
 */
export function createDb(d1: D1Database) {
	return drizzle(d1, { schema });
}

export type DB = ReturnType<typeof createDb>;

// Re-export schema so callers can do:  import { createDb, schema } from '$lib/server/db'
export { schema };
