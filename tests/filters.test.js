const tap = require('tap')
const LazyList = require('../src/index')

tap.test('filter', t => {
	t.test('should keep elements that pass predicate', t => {
		const result =
			LazyList
				.iterate(1, x => x + 1)
				.filter(x => x % 3 == 0)
				.take(5)

		t.strictSame(result, [ 3, 6, 9, 12, 15 ])
		t.end()
	})
	t.end()
})

tap.test('reject', t => {
	t.test('should remove elements that pass predicate', t => {
		const result =
			LazyList
				.iterate(1, x => x + 1)
				.reject(x => x % 3 == 0)
				.take(5)

		t.strictSame(result, [ 1, 2, 4, 5, 7 ])
		t.end()
	})
	t.end()
})
