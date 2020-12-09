let fs = require('fs')
// Read one group's answers into each element of arr
let arr = fs.readFileSync('input.txt').toString().split('\n')
if (arr[arr.length-1].length < 1) { arr.length-- }
// console.log(arr)
// console.log(`:${arr[arr.length-1]}:`)

// Representing the input file with regular expressions, each line matches:
//      ^(acc|jmp|nop) [+-]\d+$

let pc = 0                              // Program Counter location in program
let executed = new Array(arr.length)    // Track # of times an op is executed
executed.fill(0)
let acc = 0                             // Accumulator
let instr = ''                          // Current instruction [op arg]
let op = 'nop'                          // Current operation
let arg = 0                             // Argument for op
while (true) {
    executed[pc]++
    if (executed[pc] > 1) {
        console.log(`Aborting, attempted to repeat line ${pc}: '${arr[pc]}'`)
        break
    }

    instr = arr[pc].split(' ')
    op = instr[0]
    arg = 1*instr[1]
    // console.log(`Exec line ${pc}: '${op} ${arg}'`)

    switch (op) {
        case 'acc':
            acc += arg
            pc++
            break
        case 'jmp':
            pc += arg
            break
        case 'nop':
            pc++
            break
        default:
          console.log(`Unknown operation ${op} on line ${pc}: '${arr[pc]}'`)
          exit                          // Invalid command to throw exception
    }
}

console.log(`Final value of accumulator is ${acc}`);