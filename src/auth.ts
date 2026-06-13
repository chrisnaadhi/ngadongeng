import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { drizzle } from 'drizzle-orm/d1';

/**
 * Auth.js configuration.
 *
 * The config callback receives `event` so we can access the D1 binding
 * from `event.platform.env.DB` on each request (required for Cloudflare Workers).
 *
 * Required environment variables (set in .env for dev, wrangler secrets for prod):
 *   AUTH_SECRET        — random string, e.g. `openssl rand -base64 32`
 *   GOOGLE_CLIENT_ID   — from Google Cloud Console → OAuth 2.0 credentials
 *   GOOGLE_CLIENT_SECRET
 */
export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
	const d1 = event.platform?.env?.DB;
	const db = d1 ? drizzle(d1, { schema }) : null;

	return {
		adapter: db
			? DrizzleAdapter(db, {
					usersTable: schema.users,
					accountsTable: schema.accounts,
					sessionsTable: schema.sessions,
					verificationTokensTable: schema.verificationTokens
				})
			: undefined,

		providers: [
			Google({
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET
			})
		],

		// Required for Cloudflare — trusts the host header from the Workers runtime
		trustHost: true,
		// Must be an explicit string; @auth/core 0.41.x resolves basePath to a
		// non-string in the Cloudflare Workers environment, causing
		// `basePath?.replace is not a function` at runtime.
		basePath: '/auth',
		secret: env.AUTH_SECRET,

		callbacks: {
			// Expose user id and role to the client-side session
			session({ session, user }) {
				if (user) {
					session.user.id = user.id;
					// @ts-expect-error — role is a custom field added to the users table
					session.user.role = user.role ?? 'reader';
				}
				return session;
			},
			redirect({ baseUrl }) {
				return baseUrl;
			}
		},

		pages: {
			signIn: '/masuk',
			error: '/masuk'
		},

		logger: {
			error(error) {
				console.error('[auth:error]', error);
			},
			warn(code) {
				console.warn('[auth:warn]', code);
			}
		}
	};
});
