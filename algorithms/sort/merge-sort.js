/*
Stable
Non-destructive

Recursive
1. Pivot: midway point in array
2. Split array:
   left = arr[0:pivot]
   right = arr[pivot:]
3. Recurse: sort(left) + sort(right)

Merge sort
- assuming received arrays are sorted
1. Create holding array
2. Loop arrays
   - Compare first elements: a[0] <= b[0]
   - Add smaller element to holding array
   - Stop: either array has no length
3. Concat remainder
*/

const merge = [
    function(a, b) {
        let i = 0
        let j = 0

        const sorted = []
        while (sorted.length < a.length + b.length)
            if (a[i] <= b[j] || j === b.length) {
                sorted.push(a[i])
                i++
            }
            else {
                sorted.push(b[j])
                j++
            }
        return sorted
    },
    function(a, b) {
        let i = 0
        let j = 0
        
        const sorted = []
        while (sorted.length < a.length + b.length) {
            if (i >= a.length) {
                sorted.push(b[j])
                j++
            }
            else if (j >= b.length) {
                sorted.push(a[i])
                i++
            }
            else if (a[i] <= b[j]) {
                sorted.push(a[i])
                i++
            }
            else {
                sorted.push(b[j])
                j++
            }
        }
        return sorted
    },
    function(a, b) {
        const sorted = []
        while (sorted.length < a.length + b.length) // CAUTION!
            if (a[0] <= b[0])
                sorted.push(a.shift())
            else
                sorted.push(b.shift())
        return sorted.concat(a, b)
    },
    function(a, b) {
        const sorted = []
        while (a.length && b.length) // COMPARE
            if (left[0] <= b[0])
                sorted.push(a.shift())
            else
                sorted.push(b.shift())
        return sorted.concat(a, b)
    }
]

const merge_sort = [
    function(arr, fn) {
        if (arr.length < 2)
            return nums
        const mid = Math.floor(arr.length / 2)
        const left = arr.slice(0, mid)
        const right = arr.slice(mid)
        return fn(merge_sort(left), merge_sort(right))
    }
]

const tests = [
    [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
]

for (const test of tests) {
    const sort = merge_sort[0]
    for (const fn of merge) {
        console.log(test, sort(test, fn))
    }
}

export { merge, merge_sort }