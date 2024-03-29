const A = function(val = 2) {
    this.__val = val
    console.log('this val', this.__val)
    return function(fn = state => state) {
        this.__val = fn(val)
        return () => ({ val: this.__val })
    }
}

console.log('a')
const a = new A()
const a_1 = a()
console.log(a_1)
console.log(a_1().val)
const a_2 = a(v => v ** 2)
console.log(a_2().val)
const a_3 = a(v => v + 3)
console.log(a_3().val)

const B = function(val = 2) {
    let __val = val
    return function(fn = state => state) {
        __val = fn(__val)
        return () => ({ val: __val })
    }
}

console.log('b')
const b = new B()
const b_1 = b()
console.log(b_1)
console.log(b_1().val)
const b_2 = b(v => v ** 2)
console.log(b_2().val)
const b_3 = b(v => v + 3)
console.log(b_3().val)

/*
console.log(__val)
const C = function(val = 2) {
    __val = val
    return function(fn = state => state) {
        __val = fn(__val)
        return () => ({ val: __val })
    }
}

console.log('c')
console.log('__val', __val)
const c = new C()
const c_1 = c()
console.log(c_1)
console.log(c_1().val)
const c_2 = c(v => v ** 2)
console.log(c_2().val)
const c_3 = c(v => v + 3)
console.log(c_3().val)
*/