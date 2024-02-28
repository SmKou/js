/*
Stable

Non-comparison-based sort
- subset of counting sort
- sometimes called "Bucket sort" (not same)

Loop: Determine max length
Loop:
1. Enqueue number in buckets based on digit
2. Dequeue numbers into array

Does this work for strings?
*/

const radix = nums => {
    let d = 0
    for (const v of nums)
        d = Math.max(d, Math.floor(Math.log(v) / Math.log(10)))
    const buckets = new Array(10).fill().map(() => [])

    const sort = {}

    const upn = nums.slice()
    const upb = buckets.slice()
    for (let idx = 0; idx < d; ++idx) {
        while (upn.length) {
            const n = upn.shift()
            const i = Math.floor(n % 10 ** (idx + 1) / 10 ** (idx))
            upb[i].push(n)
        }

        for (let i = 0; i < upb.length; ++i)
            while (upb[i].length)
                upn.push(upb[i].shift())
    }
    sort.up = upn

    const dnn = nums.slice()
    const dnb = buckets.slice()
    for (let idx = d - 1; idx >= 0; --idx) {
        while (dnn.length) {
            const n = dnn.shift()
            const i = Math.floor(n % 10 ** (idx) / 10 ** (idx - 1))
            dnb[i].push(n)
        }

        for (let i = 0; i < dnb.length; ++i)
            while (dnb[i].length)
                dnn.push(dnb[i].shift())
    }
    sort.down = dnn

    return sort
}

const radix_sort = [
    function(arr) {
        let d = 0
        for (const v of arr)
            d = Math.max(d, Math.floor(Math.log(v) / Math.log(10)))

        const buckets = new Array(10).fill().map(() => [])
        for (let i = 0; i < d; ++i) {
            while (arr.length) {
                const n = arr.shift()
                buckets[Math.floor(n % 10 ** (d + 1) / 10 ** d)].push(n)
            }

            for (let j = 0; j < buckets.length; ++j)
                while (buckets[j].length)
                    arr.push(buckets[j].shift())
        }
        return arr
    }
]

const tests = [
    [109, 901, 224, 58],
    produce(),
    [20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34, 3000, 3001, 1200, 533]
]

// for (const test of tests) {
//     const res = radix(test)
//     console.log(test, res.up, res.down)
// }

export { radix_sort }