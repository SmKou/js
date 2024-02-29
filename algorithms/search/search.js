/*
Linear search
1. Loop:
   Check if element === value

Binary search
- requires sorted array
1. Min, max, pivot
2. Compare
*/

const linear_search = (arr, val) => {
    if (!arr.length)
        return -1

    if (arr.length < 2)
        return arr[0] === val ? 0 : -1

    for (const [i, v] of arr.entries())
        if (v === val)
            return i
    return -1
}

// Check if arr is sorted
const binary_search = (arr, val) => {
    switch (arr.length) {
        case 0:
            return -1
        case 1:
            return arr[0] === val ? 0 : -1
    }

    let min = 0
    let max = arr.length - 1
    let pivot = Math.floor(arr.length / 2)

    while (min < max) {
        pivot = Math.floor((max - min) / 2)
        if (arr[min] === val)
            return min
        else if (arr[max] === val)
            return max
        else if (arr[pivot] === val)
            return pivot
        else
            if (val < arr[pivot])
                max = pivot
            else
                min = pivot
    }
    return -1
}