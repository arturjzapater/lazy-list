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

	t.test('should throw if input is not a function', t => {
		const funs = [ 15, 'potato', undefined, null, { a: 12 }, [ 1, 2, 3 ] ]
			.map(x =>  () =>
				LazyList
					.of([ 1, 2, 3 ])
					.filter(x)
					.toArray()
			)

		funs.forEach(fun => t.throws(fun))
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

	t.test('should throw if input is not a function', t => {
		const funs = [ 15, 'potato', undefined, null, { a: 12 }, [ 1, 2, 3 ] ]
			.map(x =>  () =>
				LazyList
					.of([ 1, 2, 3 ])
					.reject(x)
					.toArray()
			)

		funs.forEach(fun => t.throws(fun))
		t.end()
	})
	t.end()
})
