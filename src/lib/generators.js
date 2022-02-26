function* cycle(xs) {
	if (!Array.isArray(xs)) {
		throw new TypeError(`Expected array, but found ${typeof xs}`)
	}

	let curr = 0
	while (true) {
		yield xs[curr]
		curr =
			curr >= xs.length - 1
				? 0
				: curr + 1
	}
}
cycle.infinite = true

function* iterate(x, fun) {
	if (typeof fun != 'function') {
		throw new TypeError(`Expected function, but found ${typeof fun}`)
	}

	let curr = x
	while (true) {
		yield curr
		curr = fun(curr)
	}
}
iterate.infinite = true

function* of(xs) {
	if (!Array.isArray(xs)) {
		throw new TypeError(`Expected array, but found ${typeof xs}`)
	}

	for (let i = 0; i < xs.length; i++) yield xs[i]
}
of.infinite = false

function* repeat(fun) {
	if (typeof fun != 'function') {
		throw new TypeError(`Expected function, but found ${typeof fun}`)
	}

	while (true) yield fun()
}
repeat.infinite = true

module.exports = {
	cycle,
	iterate,
	of,
	repeat,
}
