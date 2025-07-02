const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			colors: {
				// UIAP Theme single color
				primary: {
					50: '#00888A',
					100: '#F4FAF9',
					200: '#00888A',
					300: '#00888A',
					400: '#ebf9fa',
					500: '#f4f6f5',
					600: '#00888A',
					700: '#00888A',
					800: '#00888A',
					900: '#00888A'
				}

				// neutral
				// primary: {"50":"#fafafa","100":"#f5f5f5","200":"#e5e5e5","300":"#d4d4d4","400":"#a3a3a3","500":"#737373","600":"#525252","700":"#404040","800":"#262626","900":"#171717"}

				// zinc
				// primary: {"50":"#fafafa","100":"#f4f4f5","200":"#e4e4e7","300":"#d4d4d8","400":"#a1a1aa","500":"#71717a","600":"#52525b","700":"#3f3f46","800":"#27272a","900":"#18181b"}
			},
			fontFamily: {
				Sen : ['Sen', 'sans-serif'],
				Nunito: ['Nunito','sans-serif'],
			}
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
