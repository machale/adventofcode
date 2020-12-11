// Read the input
let fs = require('fs')
let arr = fs.readFileSync('testdataA.txt').toString().split('\n')
if (arr[arr.length-1].length < 1) { arr.length-- }  // Ignore empty last line

// Sort the array of adapters numerically
arr.sort( function(a, b) { return a - b } )
// Add the outlet and the device to the array
// (For consistency, keep them as strings like the others)
arr.unshift('0')
arr.push(`${1*arr[arr.length - 1] + 3}`)

console.log(`Data Set\n${arr}`)

//////////////////////////////////////////////////////////////////////////////

console.log('\n*** Day 10 Part 1 ***')

let diffs = [-1, 0, 0, 0]

function sumDiffs() {
    for (let i = 0; i < arr.length - 1; i++) {
        diffs[arr[i+1] - arr[i]]++
    }
}

sumDiffs()
console.log(`Differences of 1, 2 and 3 jolts: ${diffs.slice(1)}`)
console.log(`Product of 1-jolt and 3-jolt differences: ${diffs[1] * diffs[3]}`)

//////////////////////////////////////////////////////////////////////////////

console.log('\n*** Day 10 Part 2 ***')

/*
All sample data sets show only jolt differences of 1 and 3, never 2.
We know we can connect all adapters together, so consider which
adapters we can drop in order to vary the overall chain.

You can't drop any values that would result in a gap exceeding 3 jolts.
So the only parts of the chain worth analyzing are strings of sequential
values. For example, here's the first set of test data, including
the outlet and the device:
    0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22
We can't consider dropping either end (0 or 22). Starting from the left,
we can't drop 1 since that would leave a gap of more than 3.

Next consider the maximum-length string of sequential values:
    4, 5, 6, 7
We can't drop either end since that would leave a gap over 3. But for the
interior values of 5, 6, we could keep them both, drop either one, or drop
them both, for a total of (4) possibilities.

The next maximum-length string of sequential values is:
    10, 11, 12
We can't drop the ends. For the interior value of 11, we can keep it or
drop it, for a total of (2) possibilities.

The next maximum-length string of sequential values is:
    15, 16
We can't drop the ends, so there are no variations here.

So we have (4) options from [4, 5, 6, 7] and (2) options from [10, 11, 12].
We multiply 4 * 2 to get 8, which is the correct answer for this example.

So far we've seen a string of 3 sequential values gives us 2 options and a
string of 4 sequential values gives us 4 options. Consider this snippet that
gives us a maximum-length string of 5 sequential values:
    0, 1, 4, 5, 6, 7, 8, 11
The maximum-length string of 5 sequential values is:
    4, 5, 6, 7, 8
We can't drop the ends. For the interior values of 5, 6, 7, we could keep
them all (1), drop any individual one (3), we could drop adjacent pair
5, 6 (1) or we could drop adjacent pair 6, 7 (1) for a total of 6 options.
You can't drop more than 2 adjacent values since that would leave a gap of
more than 3 jolts.

Finally, note that we can ignore strings of 1 or 2 sequential values since
we can't drop any values without leaving a gap of more than 3 jolts.

I propose that, given a string of n sequential values, for n > 2, that
string gives us the following options to vary the chain of adapters:
    1 - keep all interior values
    n-2 - drop each interior value individually (the 2 are the end values)
    n-3 - drop each adjacent pair of interior values
So for a maximum-length string of n sequential values, the number of options
available is 1 + n-2 + n-3 = 2n-4

The following code works for the small example, but gives the wrong value
for the longer example (code yields 10368 but the right answer is 19208).
Why?

The output (file out2.txt) shows all the maximum-length strings of sequential
values, and shows when they are used to add to the overall number of
combinations. It seems to me to be implementing the logic and formulas above.
So what am I missing?
*/

let combinations = 1    // Multiplication identity
let li = ri = 0         // Left/right indices of string of seq values
while (li < arr.length - 1) {
    for (ri = li + 1; ri < arr.length; ri++) {
        if (arr[ri] - arr[li] > ri - li) {
            ri = ri - 1
            break
        }
    }
    console.log(`Found string ${arr.slice(li, ri+1)}`)
    if (ri - li >= 2) {
        combinations *= (2 * (ri - li + 1) - 4)
        console.log(`  String combos = ${(2 * (ri - li + 1) - 4)}, ` +
            `total combinations so far = ${combinations}`)
    }
    li = ri + 1
}

console.log(`There are ${combinations} possible combinations of adaptors`)