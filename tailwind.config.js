module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#6200ee",
				"primary-variant": "#3700B3",
				secondary: "#03DAC6",
				"secondary-variant": "#180786",
				background: "#fff",
				surface: "#fff",
				error: "#b00020",
				"dark-primary": "#121212",
				"dark-surface": "#212121",
				"dark-surface-3": "#333333",
				"dark-secondary": "#03DAC5",
			},
			boxShadow: {
				surface: ["0 1px 3px rgba(0,0,0,0.12)", "0 1px 2px rgba(0,0,0,0.24)"],
			},
			height: {
				formContainerHeight: "calc(100vh - 10em)",
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".surface-text": {
					"@apply text-white dark:text-black": {},
				},
			});
		},
	],
	darkMode: "class",
};
