let count = 0
let countdown = 1000001

console.log('calculating...')

// while (--countdown > 0) {
//     const v = Math.random()
//     if (v < 0.1) { count++ }
//     console.log(countdown, count)
// }

// console.log('zeroes:', count + ' is ' + (count / 1000001))

const random_bm = () => {
    const u = Math.random()
    const v = Math.random()
    const z0 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z0
}

// while (--countdown > 0) {
//     const v = random_bm()
//     if (v < 0 || v > 1) { count++ }
//     console.log(countdown, v)
// }
// console.log('out of range', count + ' is ' + (count / 1000001))

countdown = 31
while (--countdown > 0) {
    const v = random_bm()
    console.log(v, v * 1 + 0)
}

