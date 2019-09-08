// JavaScript is a lexical scoping language
// -> inheritance flows inwards
console.group("Inheritance")

function outsideF (x) {
    function insideF () {
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
function enclosedFunction () {  // memory alloc
    let counter = 0
    let Increment = () => {     // scope and memory is enclosed within the wrapping function
        counter++
        console.log(counter);
    }
    return {Increment}
}                               // once instatitate an instance of this function, js keep it in an isolated memory space, including the variables 

let count = enclosedFunction()  // instantiates an intance of a function which can call enclosed function
count.Increment()   // return 1
count.Increment()   // return 2
console.log(count.counter)  // return undefined, can't return remembered private variables of that instance
console.groupEnd()
// -> closures are functions with preserved data

console.groupEnd()

