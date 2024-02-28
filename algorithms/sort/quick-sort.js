/*
Stable
Non-destructive
- variants:
  destructive
  select pivot from first, middle, last elements

Recursive
1. Select pivot
2. Loop array:
   Element <= pivot: push into left list
   Element > pivot: push into right list
3. Recurse: sort(left) + pivot + sort(right)
*/

const quick_sort = [
    function(arr) {
        if (arr.length < 2)
            return arr

        const pivot = arr.pop()
        const left = []
        const right = []
        for (const v of arr)
            if (v <= pivot)
                left.push(v)
            else
                right.push(v)
        /*
            let left = []
            left = quick_sort(left)

            let right = []
            right = quick_sort(right)

            return left.concat(pivot, right)
        */
        return quick_sort(left).concat(pivot, quick_sort(right))
    }
]

const tests = [
    [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
]

for (const test of tests) 
    for (const fn of quick_sort)
        console.log(test, fn(test))

export { quick_sort }