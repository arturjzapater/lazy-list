const funs = require('./lib/functions')
const helpers = require('./lib/helpers')
const generators = require('./lib/generators')

function LazyList(gen, ...args) {
	this.funs = []
	this.infinite = gen.infinite
	this.generator = gen(...args)
}

LazyList.prototype.filter = function(pred) {
	if (typeof pred != 'function') {
		throw new TypeError(`Expected function, but found ${typeof pred}`)
	}

	this.funs.push(funs.filter(pred))
	return this
}

LazyList.prototype.map = function(mapper) {
	if (typeof mapper != 'function') {
		throw new TypeError(`Expected function, but found ${typeof mapper}`)
	}

	this.funs.push(funs.map(mapper))
	return this
}

LazyList.prototype.reject = function(pred) {
	if (typeof pred != 'function') {
		throw new TypeError(`Expected function, but found ${typeof pred}`)
	}

	this.funs.push(funs.reject(pred))
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
		const [ add, value ] = helpers.apply(curr.value, this.funs)
		if (add && result === undefined && first) {
			result = value
			first = false
		}
		else if (add) {
			result = fun(result, value)
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
		const [ add, value ] = helpers.apply(curr.value, this.funs)
		if (add) {
			result.push(value)
			n--
		}
		curr = this.generator.next()
	}

	return result
}

LazyList.prototype.takeWhile = function(fun) {
	const result = []
	let curr = this.generator.next()

	while (!curr.done) {
		const [ add, value ] = helpers.apply(curr.value, this.funs)
		if (!fun(value)) break
		if (add) result.push(value)
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
		const [ add, value ] = helpers.apply(curr.value, this.funs)
		if (add) result.push(value)
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
