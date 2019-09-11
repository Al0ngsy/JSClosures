// JavaScript is a lexical scoping language
// -> inheritance flows inwards

// Closure: scope and memory is enclosed within the wrapping function
// has access to its own scope, outer function variables/parameters and global variables

console.group("Inheritance")

function outsideF (x) {                         // start of a closure im global context
    function insideF () {                       // start another closure
        return x + 5;
    }
    return [insideF, insideF()];
}

console.dir(outsideF(3))

console.groupEnd()

//// Example betweeen open & enclosed Function
console.group("Open & Enclosed")

/// Open
console.group("Open")
function openFunction () {  // memory alloc
    let counter = 0
    counter++
    console.log(counter)
}                           // memory release

openFunction()  // return 1
openFunction()  // return 1
console.groupEnd()
// -> no permanence, after memory release everything inside function ist loss

/// Enclosed
console.group("Enclosed")
function enclosedFunction () {  // start of a closure im global context
    let counter = 0
    let Increment = () => {     // start another closure
        counter++               
        console.log(counter);
    }
    return {Increment}
}                               // once instatitate an instance of this function, 
                                // js keep it in an isolated memory space, including the variables 

let count = enclosedFunction()  // instantiates an intance of a function which can call enclosed function
                                // instantiates does not start a closure, but alloc memory
count.Increment()   // return 1
count.Increment()   // return 2

count = ""                      // free alloc memory

console.log(count.counter)  // return undefined, can't return remembered private variables of that instance
console.groupEnd()
// -> closures are functions with preserved data

console.groupEnd()

console.group("Classes & Closure")

class Object {                  // start a closure in global context
    
    // private class field from t39/stage3 as of now
    // #b

    constructor(a, b) {
        // public
        this._a = a
        // "private" -> closure variable, can't be access from outside
        let _b = b
        // true private from the t39/stage3 
        // this.#b = b
        // or simply
        // #b = b

        this.sumFunction = () => {     // start of another closure
            // has access to this, a, b, _b
            this._a = this._a + _b
        }

        this.sumFunction2 = (integer) => {  // since this has access to the same parameter
                                            // & variables as the closure above, js just "merge"
                                            // them & don't start another closure
            this._a = this._a + _b + integer
        }
    }

    get a() {                   // access this of global context
                                // js don't start another closure here,
                                // but merge it with the global context closure
        return this._a
    }
}

function createObject(a, b) {      // start a closure
    let obj = new Object(a, b)     // this instantiate "create" 2 closures, see above & alloc memory
    console.log(obj)
    console.log(obj._a)            // return 5
    console.log(obj._b)            // return undefined since "private"
    //console.log(obj.#b)           // return undefined since private
    obj = ""                       // free alloc memory
}

createObject(5, 10) 

console.groupEnd()