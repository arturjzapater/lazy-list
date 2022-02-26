module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
  },
  extends: [ 'eslint:recommended', 'pixie' ],
  globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
		ecmaVersion: 2020,
  },
}
