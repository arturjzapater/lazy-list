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

function* of(xs) {
	if (!Array.isArray(xs)) {
		throw new TypeError(`Expected array, but found ${typeof xs}`)
	}

	for (let i = 0; i < xs.length; i++) yield xs[i]
}

module.exports = {
	cycle,
	iterate,
	of,
}
