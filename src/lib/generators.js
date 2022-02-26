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

function* of(xs) {
	if (!Array.isArray(xs)) {
		throw new TypeError(`Expected array, but found ${typeof xs}`)
	}

	for (let i = 0; i < xs.length; i++) yield xs[i]
}

module.exports = {
	cycle,
	of,
}
