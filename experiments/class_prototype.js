class Proto {
    constructor(val) {
        this.val = val
    }
}

const proto = (val) => ({ val })

const a = new Proto(1)
const b = proto(2)

console.log(a, b)