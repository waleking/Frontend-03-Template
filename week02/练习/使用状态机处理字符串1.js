/**
 * 使用状态机实现对abcdef的匹配
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
        return foundA;
    } else {
        return start;
    }
}


function foundA(c){
    if(c === "b"){
        return foundB;
    } else {
        return start(c); // reconsume
    }
}

function foundB(c){
    if(c === "c"){
        return foundC;
    } else {
        return start(c); // reconsume
    }
}

function foundC(c){
    if(c === "d"){
        return foundD;
    } else {
        return start(c); // reconsume
    }
}

function foundD(c){
    if(c === "e"){
        return foundE;
    } else {
        return start(c); // reconsume
    }
}

function foundE(c){
    if(c === "f"){
        return end;
    } else {
        return start(c); // reconsume
    }
}

// The trap function in a state machine
function end(){
    return end;
}

// console.log(match("abcdef")); //true
// console.log(match("ab_cdef"));//false
// console.log(match("adef"));   //false
// console.log(match("wabcdefw"));//true
console.log(match("ababcdef"));//true
