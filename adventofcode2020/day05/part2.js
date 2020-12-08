let fs = require('fs')
// Read one boarding pass into each element of arr
let arr = fs.readFileSync('input.txt').toString().split('\n')
if (arr[arr.length-1].length < 10) { arr.length-- }
// console.log(arr)
// console.log(arr.length)

// Given a range of two values, return the low and high of the
// top or bottom half of that range as specified by the 'half'
// parameter. F or L indicates lower half, otherwise the upper.
let getHalf = function(low, high, half) {
    if (half === 'F' || half === 'L') {
        high = low + Math.floor((high - low) / 2)
    } else {
        low = high - Math.floor((high - low) / 2)
    }
    return [low, high]
}

// console.log(getHalf(0, 7, 'F'))
// console.log(getHalf(0, 7, 'L'))
// console.log(getHalf(0, 7, 'B'))
// console.log(getHalf(0, 7, 'R'))
// console.log(getHalf(0, 7, 'X'))
// console.log(getHalf(0, 7, ''))

let getBPass = function(bpass) {
    // let bpass = 'FBFBBFFRLR'
    let lowRow = 0
    let highRow = 127
    let lowCol = 0
    let highCol = 7
    let newHalf = [-1, -1]

    for (let i = 0; i < 7; i++) {
        newHalf = getHalf(lowRow, highRow, bpass[i])
        lowRow = newHalf[0]
        highRow = newHalf[1]
    }
    for (let i = 7; i < 10; i++) {
        newHalf = getHalf(lowCol, highCol, bpass[i])
        lowCol = newHalf[0]
        highCol = newHalf[1]
    }

    let seatID = 8 * lowRow + lowCol

    return [lowRow, lowCol, seatID]
}

let bp = [-1, -1. -1]
let maxSeatID = -1
let seatMap = []        // For part 2
for (let i = 0; i < arr.length; i++) {
    bp=getBPass(arr[i])
    // console.log(`${arr[i]}: row ${bp[0]}, column ${bp[1]}, seat ID ${bp[2]}.`)
    if (bp[2] > maxSeatID) { maxSeatID = bp[2]}

    // For part 2 of the puzzle, make an array of seat IDs
    // that are NOT in the front or back row
    if (bp[0] > 0 && bp[0] < 127) { seatMap.push(bp[2]) }
}

console.log(`The highest seat ID is ${maxSeatID}`)

// Remainder is for part 2

// Sort the array of seat IDs numerically
seatMap.sort( function(a, b) { return a - b } )
// console.log(seatMap)

// Walk the sorted array of seat IDs to find the missing one.
// Recall seatIDs in the fist and last row are already excluded.
for (let i = 1; i < seatMap.length; i++) {
    if (seatMap[i] - seatMap[i-1] > 1) {
        console.log(`My seat ID is ${seatMap[i] - 1}`)
    }
}