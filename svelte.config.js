import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for privacy and terms routes during prerendering
				if (path === '/privacy' || path === '/terms') {
					return;
				}
				// Otherwise, fail the build
				throw new Error(message);
			}
		}
	}
};

export default config;