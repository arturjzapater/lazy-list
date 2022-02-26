function* of(xs) {
	for (let i = 0; i < xs.length; i++) yield xs[i]
}

module.exports = {
	of,
}
