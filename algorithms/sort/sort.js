import { bubble_sort } from './bubble-sort.js'
import { insertion_sort } from './insertion-sort.js'
import { merge, merge_sort } from './merge-sort.js'
import { quick_sort } from './quick-sort.js'

const sorts = {
    bubble_sort,
    insertion_sort,
    merge_sort,
    quick_sort
}

const args = process.argv.slice(2)
if (!args.length)
    args = Object.keys(sorts)

const tests = []

for (const test of tests)
    for (const arg of args) {
        console.log(arg)
        console.log(test)

        if (arg === 'merge_sort') {
            // use of merge
            continue
        }

        let i = 0
        for (const fn of sorts[arg]) {
            console.time(`${arg} {i + 1}`)
            const res = fn(test)
            console.timeEnd(`${arg} {i + 1}`)
            console.log(res)
            i++
        }
            
    }

