const tap = require('tap')
const LazyList = require('../src/index')

tap.test('reduce', t => {
	t.test('should fold list applying function', t => {
		const result =
			LazyList
				.of([ 1, 2, 3, 4 ])
				.reduce((acc, x) => acc + x)

		t.strictSame(result, 10)
		t.end()
	})

	t.test('should accept initial value', t => {
		const result =
			LazyList
				.of([ 1, 2, 3, 4 ])
				.reduce((acc, x) => acc + x, 10)

		t.strictSame(result, 20)
		t.end()
	})

	t.test('should throw if input is not a function', t => {
		const funs = [ 15, 'potato', undefined, null, { a: 12 }, [ 1, 2, 3 ] ]
			.map(x =>  () =>
				LazyList
					.of([ 1, 2, 3 ])
					.reduce(x)
					.toArray()
			)

		funs.forEach(fun => t.throws(fun))
		t.end()
	})

	t.test('should throw on infinite generators', t => {
		const fun = () =>
			LazyList
				.repeat(() => 1)
				.reduce((a, b) => a + b)

		t.throws(fun)
		t.end()
	})
	t.end()
})

tap.test('take', t => {
	t.test('should take n elements', t => {
		const result =
			LazyList
				.iterate(1, x => x + 1)
				.take(314)

		t.strictSame(result.length, 314)
		t.end()
	})

	t.test('should take no more elements than there are in the list', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.take(50)

		t.strictSame(result.length, 3)
		t.end()
	})

	t.test('should throw if input is not a number', t => {
		const funs = [ 'potato', undefined, null, { a: 12 }, [ 1, 2, 3 ], () => null ]
			.map(x =>  () =>
				LazyList
					.of([ 1, 2, 3 ])
					.take(x)
					.toArray()
			)

		funs.forEach(fun => t.throws(fun))
		t.end()
	})
	t.end()
})

tap.test('takeWhile', t => {
	t.test('should take until predicate is false', t => {
		const result =
			LazyList
				.iterate(100, x => x - 10)
				.takeWhile(x => x > 50)

		t.strictSame(result, [ 100, 90, 80, 70, 60 ])
		t.end()
	})

	t.test('should take no more elements than there are in the list', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.takeWhile(x => x < 200)

		t.strictSame(result.length, 3)
		t.end()
	})

	t.test('should throw if input is not a function', t => {
		const funs = [ 15, 'potato', undefined, null, { a: 12 }, [ 1, 2, 3 ] ]
			.map(x =>  () =>
				LazyList
					.of([ 1, 2, 3 ])
					.takeWhile(x)
					.toArray()
			)

		funs.forEach(fun => t.throws(fun))
		t.end()
	})
	t.end()
})

tap.test('toArray', t => {
	t.test('should turn lazy list into an array', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.toArray()

		t.strictSame(result, [ 1, 2, 3 ])
		t.end()
	})

	t.test('should throw on infinite generators', t => {
		const fun = () =>
			LazyList
				.repeat(Math.random)
				.toArray()

		t.throws(fun)
		t.end()
	})
	t.end()
})
