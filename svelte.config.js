import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],

	vitePlugin: {
		inspector: true
	},
	kit: {
		adapter: process.env.CF_PAGES ? cloudflareAdapter() : staticAdapter()
	}
};
export default config;
