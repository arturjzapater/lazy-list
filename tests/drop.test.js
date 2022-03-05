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

	t.test('should not drop any more elements after first false predicate', t => {
		const result =
			LazyList
				.of([ 2, 4, 6, 1, 2, 3, 4 ])
				.dropWhile(x => x % 2 == 0)
				.toArray()

		t.strictSame(result, [ 1, 2, 3, 4 ])
		t.end()
	})
	t.end()
})
