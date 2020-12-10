// Read the input
let fs = require('fs')
let arr = fs.readFileSync('input.txt').toString().split('\n')
if (arr[arr.length-1].length < 1) { arr.length-- }  // Ignore empty last line

// Determine if number at curr is sum of any 2 prevCount previous numbers
// We assume curr >= prevCount
let preamble = 25
let findSum2 = function(curr, prevCount = preamble) {
    for (let i = curr - prevCount; i < curr + prevCount - 1; i++) {
        for (let j = i + 1; j < curr + prevCount; j++) {
            if (1*arr[i] + 1*arr[j] === 1*arr[curr]) {
                return true
            }
        }
    }
    return false
}

// Functions to use with Array.reduce() to sum the values in an array, etc.
// These make it easier to do math on an array of string versions of numbers
// since the "1*" will cast a string to a number.
function add(accumulator, currentValue)
    { return accumulator + 1*currentValue }
function max(accumulator, currentValue)
    { return Math.max(accumulator, 1*currentValue) }
function min(accumulator, currentValue)
    { return Math.min(accumulator, 1*currentValue) }

// Find the start and end indices of contiguous numbers that sum to num
let findContigSum = function(num) {
    let sum = 0
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            sum = arr.slice(i, j+1).reduce(add, 0)
            if (sum === num) {
                return [i, j]
            } else if (sum > num) { // Doesn't work if negative numbers present
                break
            }
        }
    }
    return []       // No such sum of contiguous numbers was found
}

console.log(`*** Day 9 Part 1 ***`)
let invNum = -1         // The invalid number that is not the sum of 2 others
for (let i = preamble; i < arr.length; i++) {
    if (!findSum2(i)) {
        invNum = 1*arr[i]
        console.log(`${invNum} is not the sum of 2 ` +
            `of the previous ${preamble} numbers`)
        break
    }
}

console.log(`\n*** Day 9 Part 2 ***`)
let indices = findContigSum(invNum)
let minNum = arr.slice(indices[0], indices[1]+1).reduce(min)
let maxNum = arr.slice(indices[0], indices[1]+1).reduce(max)
console.log(`The contiguous numbers with sum ${invNum} ` +
    `are between indices ${indices[0]} and ${indices[1]}.`)
console.log(`The smallest is ${minNum}, largest is ${maxNum} ` +
    `and their sum is ${minNum + maxNum}`)
