let fs = require('fs')
// Read one entire passport, including embedded newlines,
// spaces and colons, into each element of arr
let arr = fs.readFileSync('input.txt').toString().split('\n\n')
// Drop any trailing newline/whitespace at end of file
arr[arr.length-1] = arr[arr.length-1].trim()
// console.log(arr)
// console.log(`+${arr[arr.length-1]}+`)

let passport = {
    byr: -1,        // Birth Year
    iyr: -1,        // Issue Year
    eyr: -1,        // Expiration Year
    hgt: '',        // Height
    hcl: '',        // Hair Color
    ecl: '',        // Eye Color
    pid: '',        // Passport ID
    cid: '',        // Country ID

    // Parse a string of one passport and load the passport members
    load: function(data) {
        this.clear()
        let fields = data.split(/(?:\n|:|\s+)/)
        // console.log(`fields = ${fields}`)
        for (let i = 0; i < fields.length; i += 2) {
            switch (fields[i]) {
                case 'byr':     // Birth Year
                    this.byr = 1*fields[i+1]
                    break;
                case 'iyr':     // Issue Year
                    this.iyr = 1*fields[i+1]
                    break;
                case 'eyr':     // Expiration Year
                    this.eyr = 1*fields[i+1]
                    break;
                case 'hgt':     // Height
                    this.hgt = fields[i+1]
                    break;
                case 'hcl':     // Hair Color
                    this.hcl = fields[i+1]
                    break;
                case 'ecl':     // Eye Color
                    this.ecl = fields[i+1]
                    break;
                case 'pid':     // Passport ID
                    this.pid = fields[i+1]
                    break;
                case 'cid':     // Country ID
                    this.cid = fields[i+1]
                    break;
                default:
                  console.log(`Unknown passport field ${fields[0]}`);
                  exit          // Invalid command will throw an exception
              }
        }
    },
    
    clear: function() {
        this.byr = this.iyr = this.eyr = -1
        this.hgt = this.hcl = this.ecl = this.pid = this.cid = ''
    },
    
    // Passport is valid if all fields have been set except cid is optional
    isValid: function() {
        return !!((this.byr > -1) && (this.iyr > -1) && (this.eyr > -1) &&
            this.hgt && this.hcl && this.ecl && this.pid)
    }
}

// passport.load(arr[1])
// console.log(passport)
// console.log(`Valid: +${passport.isValid()}+`)

let validCount = 0
for (let i = 0; i < arr.length ; i++) {
    passport.load(arr[i])
    if (passport.isValid()) { validCount++ }
}

console.log(`${validCount} passports are valid`)
