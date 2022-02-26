const filter = fun => x => [ Boolean(fun(x)), x ]
const map = fun => x => [ true, fun(x) ]

module.exports = {
	filter,
	map,
}
