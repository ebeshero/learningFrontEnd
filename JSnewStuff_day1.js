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
//and feeds it to 2 + 1 when yo take the f(f(x))


