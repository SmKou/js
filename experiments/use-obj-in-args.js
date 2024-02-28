const of = ({ 
    rand = function(len) { return Math.floor(Math.random() * len) }, 
    get = function(arr) { return arr[rand(arr.length)] }, 
    arr = [2,3,4]
} = {}) => get(arr)

const a = of()
const b = of({ arr: [5, 6, 7] })

console.log('a', a)
console.log('b', b)