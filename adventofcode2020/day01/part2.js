// let reader = new FileReader();
// reader.readAsText(file);

let fs = require('fs');
let arr = fs.readFileSync('input.txt').toString().split("\n");
// console.log(arr);
// console.log(arr.length)
// return

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
            for (let k = 0; k < arr.length; k++) {
                // console.log(`${arr[i]}, ${arr[j]}, ${arr[k]}, ${(arr[i] + arr[j] + arr[k])}`)
                if ((i !== k) && (j !== k) &&
                    ((1*arr[i] + 1*arr[j] + 1*arr[k]) === 2020) ) {
                    console.log(`${arr[i]}, ${arr[j]}, ${arr[k]}`)
                    console.log(`Sum is ${(1*arr[i] * arr[j] * arr[k])}`)
                    console.log('Yes!')
                    return
                }
            }
        }
    }
}
console.log('Nope')