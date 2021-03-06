const generators = require('./lib/generators')

function LazyList(gen, ...args) {
	this.infinite = gen.infinite
	this.generator = gen(...args)
}

LazyList.prototype.chunkEvery = function(n) {
	if (typeof n != 'number') {
		throw new TypeError(`Expected number, but found ${typeof n}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		while (!curr.done) {
			const result = []
			let index = 0
			while (!curr.done && index < n) {
				result.push(curr.value)
				curr = gen.next()
				index++
			}
			yield result
		}
	})()

	return this
}

LazyList.prototype.drop = function(n) {
	if (typeof n != 'number') {
		throw new TypeError(`Expected number, but found ${typeof n}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		let index = 0

		while (!curr.done && index < n) {
			curr = gen.next()
			index++
		}

		while (!curr.done) {
			yield curr.value
			curr = gen.next()
		}
	})()

	return this
}

LazyList.prototype.dropWhile = function(pred) {
	if (typeof pred != 'function') {
		throw new TypeError(`Expected function, but found ${typeof pred}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()

		while (!curr.done && pred(curr.value)) {
			curr = gen.next()
		}

		while (!curr.done) {
			yield curr.value
			curr = gen.next()
		}
	})()

	return this
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

LazyList.prototype.flatMap = function(mapper) {
	if (typeof mapper != 'function') {
		throw new TypeError(`Expected function, but found ${typeof mapper}`)
	}

	const gen = this.generator
	this.generator = (function* () {
		let curr = gen.next()
		while (!curr.done) {
			const value = mapper(curr.value)
			if (Array.isArray(value)) {
				for (let i = 0; i < value.length; i++) yield value[i]
			} else {
				yield value
			}
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
			curr = gen.next()
			if (!curr.done) yield x
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
		} else {
			result = fun(result, curr.value)
			first = false
		}
		curr = this.generator.next()
	}

	return result
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

LazyList.prototype.take = function(n) {
	if (typeof n != 'number') {
		throw new TypeError(`Expected number, but found ${typeof n}`)
	}

	const result = []
	let curr = this.generator.next()

	while (!curr.done && n > 0) {
		result.push(curr.value)
		n--
		curr = this.generator.next()
	}

	return result
}

LazyList.prototype.takeWhile = function(pred) {
	if (typeof pred != 'function') {
		throw new TypeError(`Expected function, but found ${typeof pred}`)
	}

	const result = []
	let curr = this.generator.next()

	while (!curr.done) {
		if (!pred(curr.value)) break
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
