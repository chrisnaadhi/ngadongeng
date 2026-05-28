import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { handle as authHandle } from './auth';
import { createDb } from '$lib/server/db';

/**
 * Attach a Drizzle D1 client to `event.locals.db` for every request.
 * Pages and API routes can then use `locals.db` directly without
 * needing to re-create the client.
 */
const dbHandle: Handle = async ({ event, resolve }) => {
	const d1 = event.platform?.env?.DB;
	if (d1) {
		event.locals.db = createDb(d1);
	}
	return resolve(event);
};

/**
 * Run the DB binding first, then Auth.js.
 * Auth.js needs `event.platform.env.DB` to be available when it
 * creates the Drizzle adapter per request.
 */
export const handle = sequence(dbHandle, authHandle);
