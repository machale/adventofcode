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
    // console.log(`i is ${i}`)
    // console.log((arr[i+3].match(new RegExp(arr[i+2], 'g')) || []).length)
    let l = (arr[i+3].match(new RegExp(arr[i+2], 'g')) || []).length
    // console.log(1*arr[i] <= l && l <= 1*arr[i+1])
    if (1*arr[i] <= l && l <= 1*arr[i+1]) {
        validCount++
    }
}
console.log(`Valid password count: ${validCount}`)