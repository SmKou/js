const a = (val = 1) => ({ 
    get() { return this.val || val }, 
    set(val) { this.val = val },
    extract() {
        const { val } = this
        return val
    }
})
const a_proto = a()
console.log(a_proto.get())
console.log('a proto set 2')
a_proto.set(2)
console.log(a_proto.extract())

const b = function(val = 1) {
    this._val = val
}
b.prototype.get = function() { return this._val }
b.prototype.set = function(val) { this._val = val }
b.prototype.extract = function() {
    const { _val: val } = this
    return val
}
const b_proto = new b()
console.log(b_proto.get())
console.log('b proto set 2')
b_proto.set(2)
console.log(b_proto.extract() + ' with _val')