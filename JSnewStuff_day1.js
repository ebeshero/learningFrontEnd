const reducer4 = (name, type, payload) => type === 'prepend' ? payload + name : name;
// this is a ternary operation 

const reducer5 = (name, action) => {
    const type = action.type;
    const payload = action.payload;
    return type === 'prepend' ? payload + name : name;
}

reducer5('stuff', 'prepend');


const applyTwice = (f, x) => f(f(x)); 
//calls the function twice on the supplied variable
const addOne = (number) => number + 1; 
addOne(5)  /6

//Writ the old way:

function addOneb(number) {
    return number + 1
}


//Assigining a default parameter: 

const addOne = (number=1) => number + 1; 
//or
function addOne(number=1) {
    return number + 1; 
}
console.log(addOne)

applyTwice(addOne, 1); //returns 3
//This is a higher order function. Does 1 + 1, then takes the result 
//and feeds it to 2 + 1 when you take the f(f(x))

const greetingFactory = (greeting) => (name) => greeting + ', ' + name
//notice the two fat arrows...what is happening?

const sayHello = greetingFactory('Hello');
//we have written a function that generates another function
const diHola = greetingFactory('Hola');

diHola('Class') // Hola, Class
greetingFactory('Guten Tag')('Class')


//you can write functions that take functions as parameters. 
//you can write functions that generate functions. 

const addOne = (number = 1) => number + 1;

function addOneToArray(array) {
    const newArray = [];
    fr(let i=0, i<array.legnth; i++) {
        newArray.push(addONe(array[i]));
    }
    return newArray;
}
//map does this better

const betterAddOnetoArray = array => array.map(addOne); 
//map loops over the array, runs the function on the current member of the array
// and returns a new list. 

function findArrayMax(array) {
    let arraymax = array[0]
    for(let i=1; i<array.legnth; i++) {
    if(array[i] > arrayMax)
    {arrayMax = array[i]}
    } 
    return arrayMax
    }
    //THERE’s a BETTER WAY with reduce
    const maxNumber = array => array.reduce(
    (highest, item) => item > highest ? item: highest, -Infinity
    //here, the comma at the end signals teh end fo the first parameter 
