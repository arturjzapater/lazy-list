const generators = require('./lib/generators')

function LazyList(gen, ...args) {
	this.infinite = gen.infinite
	this.generator = gen(...args)
}

LazyList.prototype.filter = function(pred) {
	if (typeof pred != 'function') {
		throw new TypeError(`Expected function, but found ${typeof pred}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		while (!curr.done) {
			if (pred(curr.value)) yield curr.value
			curr = gen.next()
		}
	})()

	return this
}

LazyList.prototype.intersperse = function(x) {
	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		while (!curr.done) {
			yield curr.value
			yield x
			curr = gen.next()
		}
	})()

	return this
}

LazyList.prototype.map = function(mapper) {
	if (typeof mapper != 'function') {
		throw new TypeError(`Expected function, but found ${typeof mapper}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		while (!curr.done) {
			yield mapper(curr.value)
			curr = gen.next()
		}
	})()

	return this
}

LazyList.prototype.reject = function(pred) {
	if (typeof pred != 'function') {
		throw new TypeError(`Expected function, but found ${typeof pred}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		while (!curr.done) {
			if (!pred(curr.value)) yield curr.value
			curr = gen.next()
		}
	})()

	return this
}

LazyList.prototype.reduce = function(fun, init) {
	if (this.infinite) {
		throw new Error('Cannot call "reduce" on infinite generators')
	}

	let first = true
	let result = init
	let curr = this.generator.next()

	while (!curr.done) {
		if (result === undefined && first) {
			result = curr.value
			first = false
		}
		else {
			result = fun(result, curr.value)
			first = false
		}
		curr = this.generator.next()
	}

	return result
}

LazyList.prototype.take = function(n) {
	const result = []
	let curr = this.generator.next()

	while (!curr.done && n > 0) {
		result.push(curr.value)
		n--
		curr = this.generator.next()
	}

	return result
}

LazyList.prototype.takeWhile = function(fun) {
	const result = []
	let curr = this.generator.next()

	while (!curr.done) {
		if (!fun(curr.value)) break
		result.push(curr.value)
		curr = this.generator.next()
	}

	return result
}

LazyList.prototype.toArray = function() {
	if (this.infinite) {
		throw new Error('Cannot call "toArray" on infinite generators')
	}

	const result = []
	let curr = this.generator.next()

	while (!curr.done) {
		result.push(curr.value)
		curr = this.generator.next()
	}
	return result
}

module.exports = {
	cycle: xs => new LazyList(generators.cycle, xs),
	iterate: (x, fun) => new LazyList(generators.iterate, x, fun),
	of: xs => new LazyList(generators.of, xs),
	repeat: fun => new LazyList(generators.repeat, fun),
}
