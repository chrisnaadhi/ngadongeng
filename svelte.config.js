import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			// Makes platform.env (D1, KV, etc.) available during `pnpm dev` via wrangler proxy
			platformProxy: {
				configPath: 'wrangler.toml',
				persist: { path: '.wrangler/state/v3' }
			}
		})
	}
};

export default config;
