let fs = require('fs')
// Read one group's answers into each element of arr
let arr = fs.readFileSync('input.txt').toString().split('\n\n')
// Drop any trailing newline/whitespace at end of file
arr[arr.length-1] = arr[arr.length-1].trim()

let yesArr = new Array(26)
let aCode = 'a'.charCodeAt(0)   // Get ASCII code of lower case a
let zCode = 'z'.charCodeAt(0)   // Get ASCII code of lower case z

// Given a string of lowercase letters a-z, return the minimal string
// that includes one of each letter that occurs. Ignore other chars.
let getYeses = function(answers) {
    yesArr.fill('')
    let code = -1
    for (let i = 0; i < answers.length; i++) {
        code = answers.charCodeAt(i)
        // Ignore anything is now lower case a-z
        if (aCode <= code && zCode >= code) {
            // console.log(`Got ${answers[i]} with code ${code}`)
            yesArr[code - aCode] = answers[i]
        }
    }
    return yesArr.join('')
}

let totalCounts = 0
let yeses = ''
for (let i = 0; i < arr.length; i++) {
    yeses = getYeses(arr[i])
    // console.log(`Group ${i} has ${yeses.length}: ${yeses}`)
    totalCounts += yeses.length
}

console.log(`Total count is ${totalCounts}`)