import { dev } from '$app/environment';
import { createDb } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from './auth';

/**
 * In local dev (`vite dev`), inject Cloudflare bindings via wrangler's
 * getPlatformProxy so that event.platform.env.DB is available without
 * needing a separate wrangler process.
 */
let platformProxy: App.Platform | undefined;

const devPlatformHandle: Handle = async ({ event, resolve }) => {
	if (dev && !event.platform?.env) {
		if (!platformProxy) {
			const { getPlatformProxy } = await import('wrangler');
			const proxy = await getPlatformProxy<App.Platform['env']>();
			platformProxy = { env: proxy.env } as App.Platform;
		}
		event.platform = platformProxy;
	}
	return resolve(event);
};

/**
 * Attach a Drizzle D1 client to `event.locals.db` for every request.
 */
const dbHandle: Handle = async ({ event, resolve }) => {
	const d1 = event.platform?.env?.DB;
	if (d1) {
		event.locals.db = createDb(d1);
	}
	return resolve(event);
};

const sessionHandle: Handle = async ({ event, resolve }) => {
	event.locals.session = await event.locals.auth();
	return resolve(event);
};

export const handle = sequence(devPlatformHandle, dbHandle, authHandle, sessionHandle);
