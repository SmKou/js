/*
Stable
Destructive

Loop:
1. Check if current < previous
2. Yes:
   - Loop left:
     Check if previous > current
     Shift previous element to current place
3. Insert current element
*/

const insertion_sort = [
    function(arr) {
        for (let i = 0; i < arr.length - 1; ++i) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
            }

            if (i === 0)
                continue;

            let j = i
            while (arr[--j] > arr[i]) {
                const temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
            }
        }
        return arr
    }, // accidentally used swap
    function(arr) {
        let num, j
        for (let i = 0; i < arr.length; ++i) {
            num = arr[i]
            j = i - 1
            while (arr[j] > num && j >= 0)
                arr[j + 1] = arr[j]
            arr[j + 1] = num
        }
        return arr
    },
    function(arr) {
        let num, j
        for (let i = 1; i < arr.length; ++i) {
            num = arr[i]
            for (j = i - 1; arr[j] > num && j >= 0; --j)
                arr[j + 1] = arr[j]
            arr[j + 1] = num
        }
        return arr
    }
]

const tests = [
    [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
]

for (const test of tests) 
    for (const fn of insertion_sort) 
        console.log(test, fn(test))


export { insertion_sort }