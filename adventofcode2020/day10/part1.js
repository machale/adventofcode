// Read the input
let fs = require('fs')
let arr = fs.readFileSync('input.txt').toString().split('\n')
if (arr[arr.length-1].length < 1) { arr.length-- }  // Ignore empty last line

// Sort the array of adapters numerically
arr.sort( function(a, b) { return a - b } )
// Add the outlet and the device to the array
// (For consistency, keep them as strings like the others)
arr.unshift('0')
arr.push(`${1*arr[arr.length - 1] + 3}`)

let diffs = [-1, 0, 0, 0]

function sumDiffs() {
    for (let i = 0; i < arr.length - 1; i++) {
        diffs[arr[i+1] - arr[i]]++
    }
}

sumDiffs()
console.log(`Differences of 1, 2 and 3 jolts: ${diffs.slice(1)}`)
console.log(`Product of 1-jolt and 3-jolt differences: ${diffs[1] * diffs[3]}`)