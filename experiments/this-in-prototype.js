function getParams(params) { console.log(params) }
function getValues({ val, value }) { console.log(val, value) }

const getParams2 = (params) => console.log(params)
const getValues2 = ({ val, value }) => console.log(val, value)

getParams({ par: 1, param: 1 })
getValues({ val: 2, value: 2 })
getParams2({ par: -1, param: -1 })
getValues({ val: -2, value: -2 })

const AnonFunc = function(val) {
    this.__val = val
}
const anon = new AnonFunc(1)
console.log('anonFunc', anon.__val)

const ArrowFunc = (val) => ({ __val: val })
const arrow = ArrowFunc(1)
/* Arrow functions cannot be used as constructor */
console.log('arrowFunc', arrow.__val)

function NamedFunc(val) {
    this.__val = val
}
const named = new NamedFunc(1)
console.log('namedFunc', named.__val)

const Proto = function({ val, amt, qty }) {
    this.__val = val
    this.__amt = amt
    this.__qty = qty
}
Proto.func = function({ val, amt, qty }) {
    return new Proto({ val, amt, qty })
}
Proto.arrow = ({ val, amt, qty }) => new Proto({ val, amt, qty })

const a = Proto.func({ val: 1, amt: 1, qty: 1 })
console.log('func', a)
const b = Proto.arrow({ val: 1, amt: 1, qty: 1 })
console.log('arrow', b)

const Equalizer = function({ val, value }) {
    this.__val = val
    this.__value = value
}
Equalizer.of = ({ val, value }) => new Equalizer({ val, value })
Equalizer.prototype.func = function(equalizer) {
    const { __val, __value } = equalizer
    return this.__val === __val && this.__value === __value
}
Equalizer.prototype.arrow = (equalizer) => {
    const { __val, __value } = equalizer
    // console.log('in arrow:', this.__val, this.__value)
    return this.__val === __val && this.__value === __value
}
/* this is undefined in arrow function */

const a_e = Equalizer.of({ val: 1, value: 1 })
console.log('equalizer', a_e)
console.log('using func')
console.log('same values', a_e.func(new Equalizer({ val: 1, value: 1 })))
console.log('diff values', a_e.func(new Equalizer({ val: '1', value: '1' })))

console.log('using arrow')
console.log('same values', a_e.arrow(new Equalizer({ val: 1, value: 1 })))
console.log('diff values', a_e.arrow(new Equalizer({ val: '1', value: '1' })))
/* always false */

const Extractor = function(val) { this.__val = val }
Extractor.of = (val) => new Extractor(val)
Extractor.prototype.extract = function() {
    const { __val } = this
    console.log('value', __val)
}

const a_e2 = Extractor.of(1)
console.log('extractor', a_e2)
a_e2.extract()

const Calculator = function(val, len) {
    this.__val = val
    this.__len = len
}
Calculator.of = (val, len = Math.random() * val) => new Calculator(val, len)
Calculator.prototype.calc = function(
    fn = len => len ** 2, 
    get = (v) => fn(v) + 1
) {
    console.log(fn(this.__len))
    console.log(get(this.__len, fn))
}

const a_c = Calculator.of(4)
console.log('calculator', a_c)
console.log(typeof Calculator.of)
a_c.calc()

const ProtoFields = function() {
    this.__val = 1
}
ProtoFields.prototype.get = function() { return this.__val }
ProtoFields.prototype.field = 2

const pf = new ProtoFields()
console.log(pf.get())
console.log(pf.field)