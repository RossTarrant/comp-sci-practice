var nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    }
                }
            }
        }
    }
}

function contains(obj, value){

    for(var key in obj){
        if(typeof(obj[key])=="object"){
            return contains(obj[key], value)
        }
        else if(obj[key]==value){
            return true
        }
    }
    return false

}

var seven = [[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]; // 7

function multiArray(arr){
    if(arr.length==0){
        return 0;
    }
    let total = 0;
    let first = arr.shift();
    
    if (Array.isArray(first)){
        total += multiArray(first);
    }
    else if(Number.isInteger(first)){
        total += first
    }

    return total + multiArray(arr);
}

function sumSquares(arr){
    if(arr.length==0){return 0}
    let total = 0;
    let first = arr.shift();

    if(Array.isArray(first)){
        total = total + sumSquares(first);
    }
    else{
        total = total + (first * first);
    }

    return total + sumSquares(arr);
}

function power(n, e){
    if(e==0){
        return 1;
    }
    else{
        return n * (power(n, e-1))
    }
}

function factorial(n){
    if(n==1){ return 1; }
    return n * factorial(n-1);
}

function productOfArray(arr){
    if(arr.length==0){ return 1; }

    return arr.shift() * productOfArray(arr);

}

var six = productOfArray([1,2,3]) // 6
var sixty = productOfArray([1,2,3,10]) // 60

console.log(six)
console.log(sixty);