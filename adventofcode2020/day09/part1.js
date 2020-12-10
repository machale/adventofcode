// Read the input
let fs = require('fs')
let arr = fs.readFileSync('input.txt').toString().split('\n')
if (arr[arr.length-1].length < 1) { arr.length-- }  // Ignore empty last line
// console.log(arr)
// console.log(`:${arr[arr.length-1]}:`)

// Determine if number at curr is sum of any 2 prevCount previous numbers
// We assume curr >= prevCount
let preamble = 25
let findSum2 = function(curr, prevCount = preamble) {
    for (let i = curr - prevCount; i < curr + prevCount - 1; i++) {
        for (let j = i + 1; j < curr + prevCount; j++) {
            // console.log(`Checking if ${1*arr[i]} + ${1*arr[j]} === ${1*arr[curr]}`)
            if (1*arr[i] + 1*arr[j] === 1*arr[curr]) {
                // console.log(`${1*arr[i]} + ${1*arr[j]} === ${1*arr[curr]}`)
                return true
            }
        }
    }
    return false
}

for (let i = preamble; i < arr.length; i++) {
    if (!findSum2(i)) {
        console.log(`${arr[i]} is not the sum of 2 of the previous ${preamble} numbers`);
        break
    }
}