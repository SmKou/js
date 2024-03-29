const A = function(val = 2) {
    const value = val
    return function(fn = state => state) {
        if (!this.__val)
            this.__val = value
        this.__val = fn(this.__val)
        return () => ({ val: this.__val })
    }
}

const a = new A()
const a_1 = a()
console.log(a()().val)
console.log(a_1().val)
// const a_2 = a_1(v => v ** 2) /* returns value: no change */
const a_3 = a(v => v ** 3)
// console.log('a2', a_2.val) /* not function */
// console.log(a_2)
console.log(a()().val)
console.log('a3', a_3().val)
console.log(a_3)

const a_4 = a(v => v + 4)
console.log(a()().val)
console.log(a_4().val)

function B(val = 2) {
    return (fn = state => state) => {
        this.__val = this.__val ? fn(this.__val) : fn(val)
        return { val: this.__val }
    }
}

console.log('b')
const b = new B()
const b_1 = b()
console.log(b_1.val)
const b_2 = b(v => v ** 2)
console.log(b_2.val)
const b_3 = b.call(this, v => v + 3)
console.log(b_3.val)

console.log('b2')
const b2 = new B()
b2(v => v / 2)
console.log(b2().val)
b2(v => v + 4)
console.log(b2().val)

function C(val = 2) {
    function internal(fn = state => state) {
        this.__val = this.__val ? fn(this.__val) : fn(val)
        return { val: this.__val }
    }
    internal.prototype.double = () => internal.call(this, v => v * 2)
    return internal
}

console.log('c')
const c = new C()
console.log(c().val)
c.double()
console.log(c().val)