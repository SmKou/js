describe('valid palindrome', () => {
    test('mixed case and non-alphanumeric char palindrome', () => {
        expect(isPalindrome("A man, a plan, a canal: Panama")).toBeTruthy()
    })

    test('middle characters not equal', () => {
        expect(isPalindrome("race a car")).not.toBeTruthy()
    })

    test('empty string', () => {
        expect(isPalindrome(" ")).toBeTruthy()
    })
})

// Rates of Growth
const alphanum = [[48,57], [65,90], [97,122]]
const non = [[33,47], [58,64], [91,96], [123,126]]

const count = ranges => {
    let counter = 0
    for (let i = 0; i < ranges.length; ++i)
        counter += ranges[i][1] - ranges[i][0]
    return counter
}

const charCode = (bound, ranges) => {
    let j = 0, i = ranges[j][0]
    while (i < ranges[ranges.length - 1][1]) {
        if (bound === 0)
            return String.fromCharCode(i)
        bound--
        if (++i > ranges[j][1]) i = ranges[++j][0]
    }
    return String.fromCharCode(ranges[ranges.length - 1][1])
}

const getRandChar = (useAlpha) => {
    const chance = Math.floor(Math.random() * 100)
    const arr = useAlpha ? alphanum
        : chance < 6 ? non : alphanum
    const n = count(arr)
    const i = Math.floor(Math.random() * n)
    const char = charCode(i, arr)
    return char
}

const cases = () => {
    const ipt = []
    for (let i = 2; i < 7; ++i) {
        const palindrome = new Array(10 ** i)
        const nonPal = new Array(10 ** i)

        const half = []
        for (let j = 0; j < arr.length / 2; ++j)
            if (j === arr.length / 2 - 1)
                half.push(getRandChar(true))
            else
                half.push(getRandChar())

        const offHalf = half.slice()
        while (offHalf[offHalf.length - 1] === half[half.length - 1])
            offHalf[offHalf.length - 1] = getRandChar(true)

        for (const [i, v] of half.entries()) {
            palindrome[i] = v
            nonPal[i] = v
        }

        let i = palindrome[palindrome.length / 2]
        while (half.length)
            palindrome[++i] = half.pop()

        i = nonPal[nonPal.length / 2]
        while (offHalf.length)
            nonPal[++i] = offHalf.pop()

        ipt.push({ ipt: palindrome.join(''), res: true })
        ipt.push({ ipt: nonPal.join(''), res: false })
    }
    return ipt
}

/*
Notes:

Error at outer loop for cases: Cannot access 'i' before initialization
Caused by use of i redeclared within loop for populating second half of input array

Error in populating half array: arr is not defined
Replace with palindrome

The cases testing rate of growth increase the number of elements found in the input array for isPalindrome. However, the input arrays are created by filling an array half the size of the intended palindrome. Characters have a 6% chance of being a non-alphanumeric character. Once populated, the half array is copied and the last element is changed to another random character. There's a 6% chance this character may be a non-alphanumeric character turning a false case into a true case, meaning there is a 6% chance that a positive case is a false positive.

...Changing the getRandChar

Added optional param: useAlpha

Modify setting arr ternary to check useAlpha first

Since the size of an input array is always even, and to populate the second half, the array used to populate the first half is popped until empty, thereby reversing the order, changing the last element of a copy of that array would cause the characters at length / 2 and length / 2 + 1 to be different. Note that it should be an alphanumeric character so as not to be skipped.

For odd-sized arrays, the middle character would be a pivot and it would still rest on the character before the pivot and the character after to be different. Doing this ensures seeing the worse-case scenario for the function as in any implementation, there is no point in traversing more than half the input array.

Just realized. The case just solved for in the last element applies to the first half of the array.

...Modify cases: populate half
*/

// Initial code
const get_half = () => {
    const initial_code = () => {
        const half = []
        for (let j = 0; j < arr.length / 2; ++j)
            half.push(getRandChar())
    }

    // Ensure last character of first half is alphanumeric
    const replace_code = () => {
        const half = []
        for (let j = 0; j < arr.length / 2; ++j)
            if (j === arr.length / 2 - 1)
                half.push(getRandChar(true))
            else
                half.push(getRandChar())
    }
}

/* Results
Note: These results are based on only one iteration of the solutions. More indicative results would require repetition and various machines.

Solution 1: Option 1 with Replace and Lowercase

"A man, a plan, a canal: Panama" | " "
0.2731001377105713, 0.010999917984008789

"race a car"
0.007200002670288086

100 elements [true, false]
0.0176999568939209, 0.0076999664306640625

1000 elements:
0.03020000457763672, 0.022699832916259766

10000 elements:
0.2645998001098633, 0.20690011978149414

100000 elements:
2.7670998573303223, 2.7516000270843506

1000000 elements:
9.863399982452393, 10.811699867248535

Solution 2: Option 1 with For Loop

"A man, a plan, a canal: Panama" | " "
0.3148000240325928, 0.00410008430480957

"race a car"
0.025500059127807617

100 elements [true, false]
0.034800052642822266, 0.015000104904174805

1000 elements:
0.14580011367797852, 0.16009998321533203

10000 elements:
3.7393999099731445, 3.1043999195098877

100000 elements:
39.379899978637695, 38.87220001220703

1000000 elements:
79781.3192999363, 68368.80940008163

Solution 3: Option 2

"A man, a plan, a canal: Panama" | " "
0.13139986991882324, 0.00970005989074707

"race a car"
0.003799915313720703

100 elements [true, false]
0.04869985580444336, 0.014599800109863281

1000 elements:
1.11080002784729, 0.14129996299743652

10000 elements:
5.8434998989105225, 5.624099969863892

100000 elements:
5.185799837112427, 4.803800106048584

1000000 elements:
46.306599855422974, 41.762699842453

Solution 4: Option 3 not two pointers

"A man, a plan, a canal: Panama" | " "
0.22639989852905273, 0.0023000240325927734

"race a car"
0.008500099182128906

100 elements [true, false]
0.20029997825622559, 0.0076999664306640625

1000 elements:
0.04460000991821289, 0.03820013999938965

10000 elements:
0.3917999267578125, 0.5596001148223877

100000 elements:
26.883599996566772, 8.694400072097778

1000000 elements:
123.84069991111755, 97.02029991149902

Solution 5: Option 3 with false two pointers

"A man, a plan, a canal: Panama" | " "
0.11339998245239258, 0.003000020980834961

"race a car"
0.05200004577636719

100 elements [true, false]
0.33859992027282715, 0.00970005989074707

1000 elements:
0.02369999885559082, 0.018500089645385742

10000 elements:
0.2070000171661377, 0.19709992408752441

100000 elements:
3.260699987411499, 2.7891998291015625

1000000 elements:
13.747499942779541, 15.58869981765747

Summary

In most cases, a function testing a non-palindrome was faster than testing the corresponding palindrome.

The solutions with the best rates of growth were 1 and 5. However, these solutions are essentially the same, the only difference being the use of an edge case to return sooner and how the while implements the comparison.

Solution 1:
const isPalindrome = s => {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    let left = 0, right = s.length - 1
    while (left <= right) {
        if (s[left] !== s[right])
            return false
        left++
        right--
    }
    return true
}

Solution 5:
const isPalindrome = s => {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    if (!s.length)
        return true 
    let left = 0, right = s.length - 1
    while(s[left] === s[right]) {
        left++
        right--
    }
    return left >= right
}

The second solution with the best rate of growth is 3:
const isPalindrome = s => {
    let left = 0, right = s.length - 1
    while (left <= right) {
        while (/[^a-zA-Z9-0]/.test(s[left])) left++
        while (/[^a-zA-Z9-0]/.test(s[right])) right--
        if (left <= right && s[left].toLowerCase() !== s[right].toLowerCase())
            return false
    }
    return true
}
*/