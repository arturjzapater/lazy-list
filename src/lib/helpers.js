const apply = (x, [ first, ...funs ]) => {
	if (!first) return [ true, x ]

	const [ cont, value ] = first(x)

	if (cont && funs[0]) return apply(value, funs)
	if (cont) return [ true, value ]
	return [ false, value ]
}

module.exports = {
	apply,
}
