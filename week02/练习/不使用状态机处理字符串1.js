function search(s, target){
    for(let i = 0; i < s.length; i++){
        if(s[i] === target){
            return true;
        }
    }
    return false;
}

console.log(search("ab c", "a")); // true
console.log(search("bb c", "a")); // false
console.log(search("", "a"));     // false
