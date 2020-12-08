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
    // AND each other field adheres to these rules:

    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    // hgt (Height) - a number followed by either cm or in:
    //     If cm, the number must be at least 150 and at most 193.
    //     If in, the number must be at least 59 and at most 76.
    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    // cid (Country ID) - ignored, missing or not.

    isValid: function() {
        let hgtNum = 1 * this.hgt.substring(0, this.hgt.length-2)
        let hgtOK = !!(
            (this.hgt.match(/^\d+cm$/) && 150 <= hgtNum && 193 >= hgtNum) ||
            (this.hgt.match(/^\d+in$/) && 59 <= hgtNum && 76 >= hgtNum)
        )
        
        return !!(
            (1920 <= this.byr && 2002 >= this.byr) &&
            (2010 <= this.iyr && 2020 >= this.iyr) &&
            (2020 <= this.eyr && 2030 >= this.eyr) &&
            hgtOK &&
            this.hcl.match(/^#[0-9a-f]{6}$/) &&
            this.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) &&
            this.pid.match(/^[0-9]{9}$/)
        )
    }
}

// passport.load(arr[19])
// console.log(passport)
// console.log(`Valid: +${passport.isValid()}+`)

let validCount = 0
for (let i = 0; i < arr.length ; i++) {
    passport.load(arr[i])
    if (passport.isValid()) { validCount++ }
}

console.log(`${validCount} passports are valid`)
