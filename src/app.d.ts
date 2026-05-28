import type { DB } from '$lib/server/db';
import type { D1Database } from '@cloudflare/workers-types';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface Platform {
			env: {
				DB: D1Database;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			cf: CfProperties;
		}
		interface Locals {
			db: DB;
			session: import('@auth/sveltekit').Session | null;
		}
		interface PageData {
			session?: import('@auth/sveltekit').Session | null;
		}
	}
}

export {};
