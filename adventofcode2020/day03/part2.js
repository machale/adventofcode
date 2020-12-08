let fs = require('fs')
let arr = fs.readFileSync('input.txt').toString().split('\n')

let width = arr[0].length
let height = arr.length
if (arr[height-1].length < width) { height-- }      // Ignore trailing newline
// height = 14     // For testing
console.log(`width ${width}, height ${height}`)

let trySlope = function(right, down) {
    let hpos = 0
    let vpos = 0
    let trees = 0
    for (hpos = 0; vpos < height; hpos += right) {
        if (hpos >= width) { hpos = hpos - width }
        if (arr[vpos][hpos] === '#') { trees++ }
        vpos += down
    }

    console.log(`Slope (${right} right, ${down} down) encountered ${trees} trees`)
    return trees
}

let mult = 1
mult *= trySlope(1, 1)
mult *= trySlope(3, 1)
mult *= trySlope(5, 1)
mult *= trySlope(7, 1)
mult *= trySlope(1, 2)

console.log (`Product of trees encountered is ${mult}`)