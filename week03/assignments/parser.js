const css = require("css"); // an npm package to compile css

const EOF = Symbol("EOF"); // EOF: End of File

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [
    {// Init a stack with the document node.
        type: "document", //In an html file, the "document" node is the root node in the DOM tree parsed from the html file.
        children: []
    }
];

let rules = []; // css rules
function addCSSRules(text){
    var ast = css.parse(text);
    console.log(JSON.stringify(ast), null, "    ");
    rules.push(...ast.stylesheet.rules);
}


function emit(token){
    let top = stack[stack.length - 1];
    if(token.type === "startTag"){
        let element = {
            type: "element",
            tagName: token.tagName,
            parent: null,
            children: [],
            attributes: []
        }
        for(let p in token){
            if(p !== "type" && p !== "tagName"){
                element.attributes.push({
                    name: p, 
                    value: token[p]
                });
            }
        }
        // construct tree by setting parent and children
        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element);
        } 
        currentTextNode = null;
    } else if(token.type === 'endTag'){
        if(top.tagName !== token.tagName){
            throw new Error("not matched!");
        } else {
            /*****Only deal with <style> tags. It's more complex to handle <link> tags******/
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content); // The top element has a child element whose type is text.
            }

            // Tags match, then pop out the top element.
            stack.pop();
        }
    } else if(token.type === "text"){
        if(currentTextNode === null){
            currentTextNode = {
                "type": "text",
                "content": ""
            }
            top.children.push(currentTextNode);
        } 
        currentTextNode.content += token.content;
    }
    if(token.type !== "text"){
        console.log(token);
    }
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
    } else if(c===">" || c==="/" || c===EOF){
        return afterAttributeName(c);  //E.g., <div >, reconsume ">" in the after attribute name state.
    } else if(c==="="){
        // This is an unexpected-equals-sign-before-attribute-name parse error. 
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c===">" || c==="/" || c===EOF){
        return afterAttributeName(c);
    } else if(c==="="){
        return beforeAttributeValue;
    } else if(c==="\u0000"){//\u0000?
    } else if(c==='"' || c==="'" || c==="<"){
    }{
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) ){ //ignore the white spaces
        return beforeAttributeValue; //ignore the white spaces
    } else if(c === "\""){
        return doubleQuotedAttributeValue;
    } else if(c === "\'"){
        return singleQuotedAttributeValue;
    } else if(c === ">"){

    } else {
        return unquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c === "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c === "\u0000"){

    } else if(c === EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c){
    if(c === "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c === "\u0000"){

    } else if(c === EOF){

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c ==="/"){
        return selfClosingStartTag;
    } else if(c ===">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else {
        //This is a missing-whitespace-between-attributes parse error. Reconsume in the before attribute name state.
        //E.g., <div id="a"x=...
        return beforeAttributeName(c);
    }
}

function unquotedAttributeValue(c){// e.g., <html maaa=a >. The last "a" is the unquotedAttributeValue
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if(c === "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if(c === ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c === "\u0000"){

    } else if(c === EOF){

    } else {
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    } else if(c === "/"){
        return selfClosingStartTag;
    } else if(c === "="){
        return beforeAttributeValue;
    } else if(c === ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c === EOF){
        
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
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
    return stack[0];
}