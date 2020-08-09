const EOF = Symbol("EOF"); // EOF: End of File

let currentToken = null;

function emit(token){
    console.log(token);
}

function data(c){ // the initial state in HTML spec
    if(c === "<"){
        return tagOpen;
    } else if (c === EOF){ // how to campare symbol and string?
        emit({type: "EOF"});
        return ;// return undefined
    } else {
        emit({
            type: "text",
            content: c
        });
        return data;
    }
}

function tagOpen(c){ //<
    if(c === "/"){
        return endTagOpen;
    } else if(c.match(/^[A-Za-z]$/)){
        currentToken = {
            type: "startTag", // including normal tags and self-closing tags
            tagName: ""
        }
        return tagName(c);
    } else {
        return ;
    }
}

function endTagOpen(c){ //</
    if(c.match(/^[A-Za-z]/)){
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    } else if(c === ">"){
        // throw exception
    } else if(c === EOF){
        // throw exception
    } else {
        // throw exception
    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){ 
        return beforeAttributeName;
    } else if(c === "/"){
        return selfClosingStartTag;
    } else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
        return tagName;
    } else if(c === ">"){
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c===">"){
        return tagName(c);
    } else if(c==="="){
        return beforeAttributeName; // todo prob
    } else if(c==="/"){
        return selfClosingStartTag;
    } else {
        return beforeAttributeName;
    }
}

function selfClosingStartTag(c){
    if(c === ">"){
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if(c===EOF){
        // throw exception
    } else {
        // throw exception
    }
}

module.exports.parseHTML = function parseHTML(html){ // module.exports? 
    // console.log(`html: ${html}`);
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state(EOF); // force the State Machine to stop here. 
}