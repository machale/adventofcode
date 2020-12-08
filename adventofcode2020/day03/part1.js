let fs = require('fs')
let arr = fs.readFileSync('input.txt').toString().split('\n')

let width = arr[0].length
let height = arr.length
if (arr[height-1].length < width) { height-- }      // Ignore trailing newline
// height = 14     // For testing
console.log(`width ${width}, height ${height}`)

let hpos = 0
let vpos = 0
let trees = 0

for (hpos = 0; vpos < height; hpos += 3) {
    if (hpos >= width) { hpos = hpos - width }
    if (arr[vpos][hpos] === '#') { trees++ }
    vpos++
}

console.log(`Encountered ${trees} trees`)