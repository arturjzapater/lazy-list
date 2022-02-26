const filter = fun => x => [ Boolean(fun(x)), x ]
const map = fun => x => [ true, fun(x) ]
const reject = fun => x => [ !fun(x), x ]

module.exports = {
	filter,
	map,
	reject,
}
