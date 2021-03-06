module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'airbnb',
		'eslint-config-prettier',
		'plugin:prettier/recommended',
		'prettier',
		'prettier/react',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'react-hooks'],
	rules: {
		'no-restricted-syntax': [
			'error',
			'ForInStatement',
			'LabeledStatement',
			'WithStatement',
		],
		'no-underscore-dangle': 'off',
		camelcase: 'off',
		'react/no-array-index-key': 'off',
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
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
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'react-hooks/rules-of-hooks': 'error',
	},
	parser: 'babel-eslint',
}
