const type_is = function(param, type, def) {
    switch (type) {
        case Map:
        case Set:
        case Function:
            if (!(param instanceof type)) {
                console.error(param + ' not of type: ' + type)
                return def
            }
        default:
            if (typeof param !== type) {
                console.error(param + ' not of type: ' + type)
                return def
            }
    }
        // throw new TypeError(param + ' not of type: ' + type)
    return param
}

const contains = function(param, key) {
    if (!param[key] || ((param instanceof Map || param instanceof Set || param instanceof Function) && !param.has(key))) {
        console.error('key not found: ' + key)
        return false
    }
    return param
}

const func = (paramIncoming, param = type_is(paramIncoming, 'string', '')) => console.log(param)

const func2 = ({ param: paramIncoming, param = type_is(paramIncoming, 'string', '') } = {}) => console.log(param)

const func3 = (param) => {
    param = type_is(param, 'object', {}) && contains(param, 'say')
    const param2 = type_is(param, Map, new Map())
    console.log(param, param2)
}

func("Hello")
func(2)

func2("Hello")
func2(2)

console.log('func3: object')
func3({ say: "Hello" })
console.log('func3: map')
const map = new Map()
map.set('say', "Hello")
func3(map)
console.log('func3: int')
func3(2)