let fs = require('fs');
let arr = fs.readFileSync('input.txt').toString().split(/(?:-|:*\s+)/);
// console.log(arr);
// console.log(arr.length)
// for (let i = 0; i < 12; i++) {
//     console.log(arr[i]);
// }

// console.log((arr[3].match(new RegExp(arr[2], 'g')) || []).length)

let validCount = 0
for (let i = 0; i < arr.length - 4; i+=4) {
// for (let i = 0; i < 9; i+=4) {
    // console.log(`At index ${i} char is ${arr[i+2][0]}`)
    // console.log(`  Matches character ${1*arr[i]}: ${arr[i+3][1*arr[i]-1] === arr[i+2][0]}`)
    // console.log(`  Matches character ${1*arr[i+1]}: ${arr[i+3][1*arr[i+1]-1] === arr[i+2][0]}`)

    // Ideas for XOR implementation from http://www.howtocreate.co.uk/xor.html
    if ((arr[i+3][1*arr[i]-1] === arr[i+2][0]) != (arr[i+3][1*arr[i+1]-1] === arr[i+2][0])) {
        // console.log(`For index ${i} XOR passes`)
        validCount++
    }
}
console.log(`Valid password count: ${validCount}`)