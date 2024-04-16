const n = [10_000, 100_000, 1_000_000, 10_000_000, 100_000_000]
const t = 100

const destruct_arrow = ({ val }) => val + 1
const destruct_anon = function({ val }) { return val + 1 }
function destruct_func({ val }) {
    return val + 1
}

const demap_arrow = ([val, v]) => v + 1
const demap_anon = function([val, v]) { return v + 1 }
function demap_func([val, v]) {
    return v + 1
}

const reg_arrow = (val) => val + 1
const reg_anon = function(val) { return val + 1 }
function reg_func(val) {
    return val + 1
}

const results = {
    destruct: { 
        destruct_arrow: new Array(n.length).fill(0), 
        destruct_anon: new Array(n.length).fill(0), 
        destruct_func: new Array(n.length).fill(0) 
    },
    demap: { 
        demap_arrow: new Array(n.length).fill(0), 
        demap_anon: new Array(n.length).fill(0), 
        demap_func: new Array(n.length).fill(0) 
    },
    reg: { 
        reg_arrow: new Array(n.length).fill(0), 
        reg_anon: new Array(n.length).fill(0), 
        reg_func: new Array(n.length).fill(0) 
    }
}

const test = () => {
    for (let i = 0; i < t; ++i) {
        for (const [idx, round] of n.entries()) {
            const start_arrow = performance.now()
            for (let r = 0; r < round; ++r)
                destruct_arrow({ val: 1 })
            results.destruct.destruct_arrow[idx] += performance.now() - start_arrow

            const start_anon = performance.now()
            for (let r = 0; r < round; ++r)
                destruct_anon({ val: 1 })
            results.destruct.destruct_anon[idx] += performance.now() - start_anon

            const start_func = performance.now()
            for (let r = 0; r < round; ++r)
                destruct_func({ val: 1 })
            results.destruct.destruct_func[idx] += performance.now() - start_func

            console.log('end destruct: ' + round)
        }
        console.log('end destruct')
        
        for (const [idx, round] of n.entries()) {
            const map = new Map()
            map.set('val', 2)
            const start_arrow = performance.now()
            for (let r = 0; r < round; ++r) 
                demap_arrow(...map) 
            results.demap.demap_arrow[idx] += performance.now() - start_arrow

            const start_anon = performance.now()
            for (let r = 0; r < round; ++r)
                demap_anon(...map)
            results.demap.demap_anon[idx] += performance.now() - start_anon

            const start_func = performance.now()
            for (let r = 0; r < round; ++r)
                demap_func(...map)
            results.demap.demap_func[idx] += performance.now() - start_func

            console.log('end demap: ' + round)
        }
        console.log('end demap')

        for (const [idx, round] of n.entries()) {
            const start_arrow = performance.now()
            for (let r = 0; r < round; ++r)
                reg_arrow({ val: 1 }) 
            results.reg.reg_arrow[idx] += performance.now() - start_arrow

            const start_anon = performance.now()
            for (let r = 0; r < round; ++r)
                reg_anon({ val: 1 })
            results.reg.reg_anon[idx] += performance.now() - start_anon

            const start_func = performance.now()
            for (let r = 0; r < round; ++r)
                reg_func({ val: 1 })
            results.reg.reg_func[idx] += performance.now() - start_func

            console.log('end reg: ' + round)
        }
        console.log('end reg')
    }

    for (const type of Object.keys(results)) {
        for (const fn of Object.keys(results[type])) {
            for (const [idx, round] of results[type][fn].entries()) {
                console.log(`${type} ${fn}: ${round / n[idx]}ms on ${n[idx]}`)
            }
        }
    }
}
test()