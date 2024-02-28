/*
Stable
Destructive

Loop:
1. Check if current < next
2. Yes: swap elements
   No: continue

Optimize: increment end
Always bubble next highest to next unsorted position
*/

const bubble_sort = [
    function(arr) {
        let swapped = true
        while (swapped) {
            swapped = false
            for (let i = 0; i < arr.length - 1; ++i)
                if (arr[i] > arr[i + 1]) {
                    const temp = arr[i]
                    arr[i] = arr[i + 1]
                    arr[i + 1] = temp
                    swapped = true
                }
        }
        return arr
    },
    function(arr) {
        let swapped = false
        do {
            for (let i = 0; i < arr.length - 1; ++i)
                if (arr[i] > arr[i + 1]) {
                    const temp = arr[i]
                    arr[i] = arr[i + 1]
                    arr[i + 1] = temp
                    swapped = true
                }
        } while (swapped)
        return arr
    }
]

const tests = [
    [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
]

for (const test of tests) 
    for (const fn of bubble_sort) 
        console.log(test, fn(test))

export { bubble_sort }