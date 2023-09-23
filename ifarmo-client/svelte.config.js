import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';


const config = {
	preprocess: [
		preprocess({
			scss: {
				prependData: `
        @use 'src/styles/breakpoints' as breakpoint;
      `
			}
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$types: 'src/lib/types',
			$helpers: 'src/helpers',
			$assets: 'src/assets',
			$fonts: 'src/lib/fonts',
			$styles: 'src/styles',
		},
	}
};

export default config;
