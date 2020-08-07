/**
 * 使用状态机实现对abcabx的匹配
 **/

function match(s){
    let state = start;
    for (let c of s){
       state = state(c);
    }
    return state === end;
}


function start(c){
    if(c === "a"){
        return found1A;
    } else {
        return start;
    }
}


function found1A(c){
    if(c === "b"){
        return found1B;
    } else {
        return start(c); // reconsume
    }
}

function found1B(c){
    if(c === "c"){
        return foundC;
    } else {
        return start(c); // reconsume
    }
}

function foundC(c){
    if(c === "a"){
        return found2A;
    } else {
        return start(c); // reconsume
    }
}

function found2A(c){
    if(c === "b"){
        return found2B;
    } else {
        return start(c); // reconsume
    }
}

function found2B(c){
    if(c === "x"){
        return end;
    } else if (c ==="c") {
        return foundC;
    } else {
        return start(c); // reconsume
    }
}

// The trap function in a state machine
function end(){
    return end;
}

console.log(match("abcabx"));  //true
console.log(match("abcabcabx"));  //true
console.log(match("abcababcabx"));  //true
console.log(match("abcabc"));   //false
console.log(match("abcbcx"));   //false

