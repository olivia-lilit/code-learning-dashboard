import adapter from '@sveltejs/adapter-auto';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter()
// 	}
// };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				exclude: ["@babichjacob/svelte-localstorage"],
			},
			ssr: {
				noExternal: ["@babichjacob/svelte-localstorage"],
			},
		}
	}
};

export default config;



// import adapter from '@sveltejs/adapter-netlify';
// // don't need to do this because we are already using the auto-adapter

// export default {
// 	kit: {
// 		adapter: adapter({
// 			// if true, will split your app into multiple functions
// 			// instead of creating a single one for the entire app
// 			split: false
// 		})
// 	}
// };