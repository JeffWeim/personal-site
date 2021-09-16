module.exports = {
	plugins: ['react', 'prettier', 'react-hooks'],
	extends: [
		'airbnb',
		'plugin:@next/next/recommended',
		'eslint-config-prettier',
		'prettier',
	],
	env: {
		browser: true,
		es6: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	rules: {
		'import/prefer-default-export': 'off',
		'import/order': [
			'error',
			{
				groups: [
					['external', 'builtin'],
					['internal', 'index', 'parent'],
					['sibling'],
				],
				'newlines-between': 'always-and-inside-groups',
			},
		],
		'jsx-a11y/accessible-emoji': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
	}
}
