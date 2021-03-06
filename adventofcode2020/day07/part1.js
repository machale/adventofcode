let fs = require('fs')
// Read one group's answers into each element of arr
let arr = fs.readFileSync('input.txt').toString().split('.\n')
if (arr[arr.length-1].length < 10) { arr.length-- }
// console.log(arr)
// console.log(`:${arr[arr.length-1]}:`)

// Revewing the input file, each bag is described with 2 words, an adjective
// and a color, like mirrored beige, plaid lime, posh gray, etc.
// Representing the input with regular expressions, each line starts with:
//      ^\w+ \w+ bags contain
// This is followed by EITHER:
//      no other bags.
// OR 1 or more occurences of:
//      \d+ \w+ \w+ bags?[,\.] ?

// For part 1, we're going to do a little brute force. We'll create a
// Map, with the containing bags as the keys and the string of contained
// bags as the values

let bagMap = new Map()
let oneLine = []
for (let i = 0; i < arr.length; i++) {
    oneLine = arr[i].split(' bags contain ')
    // console.log(oneLine)
    bagMap.set(oneLine[0], oneLine[1])
}

// Given a bag, recursively build up the list of potential containing bags
let containers = []
let findContainers = function(bagName) {
    // console.log(`Find containers for bag ${bagName}`)
    for (let [key, value] of bagMap) {
        // console.log(`  key '${key}', value '${value}', value.search(bagName) '${value.search(bagName)}', containers.indexOf(key) '${containers.indexOf(key)}'`)
        if (value.search(bagName) > -1 && containers.indexOf(key) < 0) {
            containers.push(key)
            findContainers(key)
        }
    }
}

findContainers('shiny gold')
// console.log(containers)
console.log(`${containers.length} bag colors can eventually contain the bag`)