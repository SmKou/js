const a = {
    val: 1,
    getValue: function() {
        console.log('a', this.val)
    }
}
console.log('a uses property func')
a.getValue()

const b = {
    val: 1,
    getValue: () => {
        console.log('b', this.val)
    }
}
console.log('b uses property arrow func')
b.getValue() /* undefined */

const c = {
    val: 1,
    getValue() {
        console.log('c', this.val)
    }
}
console.log('c uses named function')
c.getValue()

const nested = {
    val: 2,
    value: this.val + 1,
    getVal: function() { console.log('nested get val', this.val) },
    getValArrow: () => { console.log('nested get by arrow', this.val) },
    getValInArgs: (val = this.val) => { console.log('nested get in args', this.val) }
}
console.log('nested value', nested.value) /* NaN */
nested.getVal()
nested.getValArrow() /* undefined */
nested.getValInArgs() /* undefined */

const nested_func = {
    val: 2,
    value: function() { return this.val },
    getVal: (val = this.value) => {
        return { message: 'nested func get in arrow', val }
    },
    /* function not a function */
    /* (val = this.value) => { console.log('nested func get in arrow', val()) } */
    getValByValue: function(val = this.value) { console.log('nested func get by value', val()) }
}
console.log('nested func value', nested_func.value())
console.log('nested func get val in arrow', nested_func.getVal)
console.log(nested_func.getVal.message, nested_func.getVal.val) /* undefined undefined */
nested_func.getValByValue() /* undefined */

const closure = () => {
    const val = 1
    this.value = 2
    return () => console.log('closure', val, this.value)
}
closure()()

const double_nested = {
    val: 1,
    getValAnon: function() { return this.val + ' anon' },
    getValNamed() { return this.val + ' named' },
    internal: {
        getValAnon: function() { return this.val + ' nested anon' },
        getValNamed() { return this.val + ' nested named'}
    }
}
console.log(double_nested.getValAnon())
console.log(double_nested.getValNamed())
console.log(double_nested.internal.getValAnon()) /* undefined */
console.log(double_nested.internal.getValNamed()) /* undefined */

const nested_double_val = {
    val: 1,
    func() { return this.val }
    //, value: func() + 1
}
console.log('nested double val', nested_double_val.func())
console.log('nested double get val by func', nested_double_val.value) /* func not defined */

const args = (val = 1) => ({ value: val + 1, getVal: function() { return val } })
const args_obj = args()
console.log('args val', args_obj.getVal())
console.log('args value', args_obj.value)

const Obj = {
    val: 1,
    getVal: function() { return this.val }
}

const ObjProto = () => ({ val: 1, getVal: function() { return this.val } })

const Proto = function() {
    this.__val = 1
}
Proto.prototype.getVal = function() { return this.__val }
Proto.prototype.get = () => this.__val

console.log('use obj', Obj.getVal())
const obj_proto = ObjProto()
console.log('use obj factory', obj_proto.getVal())
const obj_2 = new Proto()
console.log('use proto', obj_2.getVal())
console.log('use arrow on proto', obj_2.get())

const double_closure = () => {
    this.val = 1
    return () => this.val
}

const closure_internal = double_closure()
console.log('closure internal', closure_internal())
console.log('closure internal value', double_closure().val) /* undefined */
double_closure.val = 2
console.log('changed value to 2')
console.log('closure internal', closure_internal()) /* unchanged */
console.log('closure internal value', double_closure().val) /* undefined */

// const func_closure = function() {
//     this.val = 1
//     return (val = this.val) => ({
//             get() { return this.val || val },
//             set(v) { this.val = v }
//     })
    
// }
const func_closure = (val = 1) => ({ get() { return this.val || val }, set(v) { this.val = v } })
/*  No difference:
    {
        get() { return this.val },
        set(v) { this.val = v }
    }
    and
    (val = this.val) => ({
        get() { return this.val },
        set(v) { this.val = v }
    })
    and
    function() {
        return {
            get() { return this.val },
            set(v) { this.val = v }
        }
    }
*/
const func = func_closure()
console.log('func get', func.get()) /* undefined */
console.log('func set 2')
func.set(2)
console.log('func get', func.get())