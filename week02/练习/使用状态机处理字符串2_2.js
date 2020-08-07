/**
 * 使用状态机实现对abababx的匹配
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
    if(c === "a"){
        return found3A;
    } else {
        return start(c); // reconsume
    }
}

function found3A(c){
    if(c === "b"){
        return found3B;
    } else {
        return start(c); // reconsume
    }
}

function found3B(c){
    if(c === "x"){
        return end;
    } else if (c ==="a") {
        return found3A;
    } else {
        return start(c); // reconsume
    }
}

// The trap function in a state machine
function end(){
    return end;
}

console.log(match("abababx"));  //true
console.log(match("ababababababx"));  //true
console.log(match("abcabcabababx"));  //true
console.log(match("abcabc"));   //false
console.log(match("abcbcx"));   //false

