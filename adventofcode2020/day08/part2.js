// Read the input
let fs = require('fs')
let arr = fs.readFileSync('input.txt').toString().split('\n')
if (arr[arr.length-1].length < 1) { arr.length-- }  // Ignore empty last line

// Representing the input file with regular expressions, each line matches:
//      ^(acc|jmp|nop) [+-]\d+$

// Run the program once, return false if loop, true if terminated correctly
let executed = new Array(arr.length)    // Track # of times an op is executed
let acc = 0                             // Accumulator
let run = function() {
    let pc = 0                          // Program Counter location in program
    executed.fill(0)
    acc = 0                             // Accumulator
    let instr = ''                      // Current instruction [op arg]
    let op = 'nop'                      // Current operation
    let arg = 0                         // Argument for op
    while (true) {
        executed[pc]++
        if (executed[pc] > 1) {
            // console.log(
            //     `Aborting, attempted to repeat line ${pc}: '${arr[pc]}'`)
            return false                // Encountered infinite loop
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
            exit                        // Invalid cmd to throw exception
        }

        if (pc === arr.length) {
            return true                 // Program terminated correctly
        }
    }
}

// Try multiple runs, swapping a single jmp/nop for each run
// If a properly-terminated run is found, return the index of the jmp/nop
// instruction that needed to be swapped. If no good run, return -1.
let trySwapping = function() {
    let instr = ''                      // Current instruction [op arg]
    let success = false
    for (let i = 0; i < arr.length; i++) {
        instr = arr[i].split(' ')

        if (instr[0] === 'acc') { continue }  // Skip it, move on

        arr[i] = (instr[0] === 'nop' ? 'jmp' : 'nop') + ' ' + instr[1]
        success = run()
        arr[i] = instr[0] + ' ' + instr[1]

        if (success) { return i }
    }
    return -1
}

let swapIndex = trySwapping()
if (swapIndex >= 0) {
    console.log(`Succeeded by swapping operation ` +
        `on line ${swapIndex}: '${arr[swapIndex]}'`)
    console.log(`Final value of accumulator is ${acc}`);
} else {
    console.log(`Could not find a solution`);
}
