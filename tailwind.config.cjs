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
					50: '#005F94',
					100: '#005F94',
					200: '#005F94',
					300: '#005F94',
					400: '#005F94',
					500: '#005F94',
					600: '#005F94',
					700: '#005F94',
					800: '#005F94',
					900: '#005F94'
				}

				// neutral
				// primary: {"50":"#fafafa","100":"#f5f5f5","200":"#e5e5e5","300":"#d4d4d4","400":"#a3a3a3","500":"#737373","600":"#525252","700":"#404040","800":"#262626","900":"#171717"}

				// zinc
				// primary: {"50":"#fafafa","100":"#f4f4f5","200":"#e4e4e7","300":"#d4d4d8","400":"#a1a1aa","500":"#71717a","600":"#52525b","700":"#3f3f46","800":"#27272a","900":"#18181b"}
			}
		}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
