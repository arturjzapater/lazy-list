const tap = require('tap')
const LazyList = require('../src/index')

tap.test('drop', t => {
	t.test('should drop n elements', t => {
		const result =
			LazyList
				.iterate(1, x => x + 1)
				.drop(10)
				.take(1)

		t.strictSame(result, [ 11 ])
		t.end()
	})
	t.end()
})

tap.test('dropWhile', t => {
	t.test('should drop elements while predicate is true', t => {
		const result =
			LazyList
				.iterate(1, x => x + 1)
				.dropWhile(x => x < 10)
				.take(1)

		t.strictSame(result, [ 10 ])
		t.end()
	})
	t.end()
})
