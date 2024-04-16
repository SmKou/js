const itr = [1000, 10000, 100000, 1000000]

const create_class = class {
    constructor(val) {
        this.val = val
    }
}

const create_obj = (val) => ({ val })

// itr.forEach(n => {
//     const label_class = `create class (${n}): `
//     const start_class = performance.now()
//     for (let i = 0; i < n; ++i) 
//         new create_class(i)
//     const time_class = performance.now() - start_class
//     console.log(label_class + time_class)

//     const label_construct = `create construct (${n}): `
//     const start_construct = performance.now()
//     for (let i = 0; i < n; ++i)
//         create_obj(i)
//     const time_construct = performance.now() - start_construct
//     console.log(label_construct + time_construct)
// })

const tests = 1000
let t = tests
const res_class = new Array(itr.length).fill(0)
const res_obj = new Array(itr.length).fill(0)
const test = () => {
    while (t > 0) {
        itr.forEach((n, i) => {
            const start_class = performance.now()
            for (let i = 0; i < n; ++i) 
                new create_class(i)
            res_class[i] += performance.now() - start_class
        })
        
        itr.forEach((n, i) => {
            const start_construct = performance.now()
            for (let i = 0; i < n; ++i)
                create_obj(i)
            res_obj[i] += performance.now() - start_construct
        })

        t--
    }

    res_class.map((res, i) => {
        const avg = res / tests
        console.log(`create class (${itr[i]}): ${avg}`)
    })

    res_obj.map((res, i) => {
        const avg = res / tests
        console.log(`create obj (${itr[i]}): ${avg}`)
    })
}
test()