const tap = require('tap')
const LazyList = require('../src/index')

tap.test('chunkEvery', t => {
	t.test('should chunk array', t => {
		const result =
			LazyList
				.of([ 1, 2, 3, 4 ])
				.chunkEvery(2)
				.toArray()

		t.strictSame(result, [ [ 1, 2 ], [ 3, 4 ] ])
		t.end()
	})

	t.test('should make incomplete chunk if not enough elements', t => {
		const result =
			LazyList
				.of([ 1, 2, 3, 4, 5 ])
				.chunkEvery(3)
				.toArray()

		t.strictSame(result, [ [ 1, 2, 3 ], [ 4, 5 ] ])
		t.end()
	})
	t.end()
})

tap.test('flatMap', t => {
	t.test('should flatten arrays', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.flatMap(x => [ x, x + x, x * x ])
				.toArray()

		t.strictSame(result, [ 1, 2, 1, 2, 4, 4, 3, 6, 9 ])
		t.end()
	})

	t.test('should flatten only one level', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.flatMap(x => [ [ x ] ])
				.toArray()

		t.strictSame(result, [ [ 1 ], [ 2 ], [ 3 ] ])
		t.end()
	})
	t.end()
})

tap.test('intersperse', t => {
	t.test('should intersperse elements', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.intersperse(10)
				.toArray()

		t.strictSame(result, [ 1, 10, 2, 10, 3 ])
		t.end()
	})
	t.end()
})

tap.test('map', t => {
	t.test('should apply mapper function to each element', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.map(x => x + 1)
				.toArray()

		t.strictSame(result, [ 2, 3, 4 ])
		t.end()
	})
	t.end()
})
