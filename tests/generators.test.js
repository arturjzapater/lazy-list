const tap = require('tap')
const LazyList = require('../src/index')

tap.test('cycle', t => {
	t.test('should make a generator from a finite array', t => {
		const result =
			LazyList
				.cycle([ 1, 2, 3 ])
				.take(3)

		t.strictSame(result, [ 1, 2, 3 ])
		t.end()
	})

	t.test('should repeat the input if more items are taken', t => {
		const result =
			LazyList
				.cycle([ 1, 2, 3 ])
				.take(10)

		t.strictSame(result, [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1 ])
		t.end()
	})

	t.test('should throw if "toArray" is called on it', t => {
		const fun = () =>
			LazyList
				.cycle([ 1, 2, 3 ])
				.toArray()

		t.throws(fun)
		t.end()
	})

	t.test('should throw if input is not array', t => {
		const fun = () =>
			LazyList
				.cycle('potato')
				.take(5)

		t.throws(fun)
		t.end()
	})
	t.end()
})

tap.test('iterate', t => {
	t.test('should return the first argument as the first item', t => {
		const result =
			LazyList
				.iterate(1, x => x + 1)
				.take(1)

		t.strictSame(result, [ 1 ])
		t.end()
	})

	t.test('should call the function on previous values to generate next items', t => {
		const result =
			LazyList
				.iterate(12, x => x % 2 == 0 ? x / 2 : x * x)
				.take(5)

		t.strictSame(result, [ 12, 6, 3, 9, 81 ])
		t.end()
	})

	t.test('should throw if "toArray" is called on it', t => {
		const fun = () =>
			LazyList
				.iterate(1, x => x + 1)
				.toArray()

		t.throws(fun)
		t.end()
	})

	t.test('should throw if the second argument is not a function', t => {
		const fun = () =>
			LazyList
				.iterate('potato', 'potato')
				.take(5)

		t.throws(fun)
		t.end()
	})
	t.end()
})

tap.test('of', t => {
	t.test('should make a generator from a finite array', t => {
		const result =
			LazyList
				.of([ 1, 2, 3 ])
				.toArray()

		t.strictSame(result, [ 1, 2, 3 ])
		t.end()
	})

	t.test('should throw if input is not array', t => {
		const fun = () =>
			LazyList
				.of('potato')
				.take(5)

		t.throws(fun)
		t.end()
	})
	t.end()
})

tap.test('repeat', t => {
	t.test('should always call the same function', t => {
		const result =
			LazyList
				.repeat(() => 1)
				.take(300)

		result.forEach(x => t.strictSame(x, 1))
		t.end()
	})

	t.test('should throw if "toArray" is called on it', t => {
		const fun = () =>
			LazyList
				.repeat(() => 1)
				.toArray()

		t.throws(fun)
		t.end()
	})

	t.test('should throw if the input is not a function', t => {
		const fun = () =>
			LazyList
				.repeat('potato')
				.take(5)

		t.throws(fun)
		t.end()
	})
	t.end()
})
