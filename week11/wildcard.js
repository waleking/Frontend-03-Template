function find(source, pattern){
    // 寻找pattern字符串中有多少个星号
    let starCount = 0;
    for(let i = 0; i < pattern.length; i++){
        if(pattern[i] === "*"){
            starCount++;
        }
    }
    // edge case, such as pattern = "abc" or "ab?" without any asterisk 
    if(starCount===0){
        if(pattern.length !== source.length){
            return false;
        }
        for(let i = 0; i < pattern.length; i++){
            if(pattern[i] !== source[i] && pattern[i]!=="?"){
                return false;
            }
        }
        return true;
    }

    // 第一个星号之前的部分
    let indexInPattern = 0;
    let lastIndexInSource = 0;

    for(indexInPattern = 0; pattern[indexInPattern]!== "*"; indexInPattern++){
        if(pattern[indexInPattern] !== source[indexInPattern] && pattern[indexInPattern]!== "?"){
            return false;
        }
    }
    lastIndexInSource = indexInPattern;

    for(let starGroup = 0; starGroup < starCount - 1; starGroup++){ // 最后一个星号要单独处理
        indexInPattern++;
        let subPattern = "";
        while(pattern[indexInPattern]!=="*"){
            subPattern += pattern[indexInPattern];
            indexInPattern++;
        }

        // 替换?号为任意字符, \s和\S合在一起就是全部字符集
        let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
        reg.lastIndex = lastIndexInSource; //指示正则表达式的起始搜索位置，接着之前的工作去找
        if(!reg.exec(source)){
            return false;
        }
        lastIndexInSource = reg.lastIndex;
    }

    // 最后一段从后往前进行循环
    for(let indexFromTail = 0; indexFromTail < pattern.length - indexInPattern; indexFromTail++){//TODO, check the condition of the loop termination
        if(lastIndexInSource > source.length - indexFromTail){
            return false;
        }
        if(source[source.length - indexFromTail] !== pattern[pattern.length - indexFromTail] && pattern[pattern.length - indexFromTail]!=="?"){
            return false;
        }
    }
    return true;
}

console.log(find("abcabcabxaac", "a*b*bx*c"));
console.log(find("abcabcabxaac", "a*b?*b?x*c"));