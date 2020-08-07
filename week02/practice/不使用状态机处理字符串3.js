function search(s, target){
  for(let i = 0; i < s.length - target.length + 1; i++){
    for(let j = 0; j < target.length; j++){
      if(s[i+j] !== target[j]){
         break;
      }
      if(j === target.length - 1 && s[i+j] === target[j]){
        return true;
      }
    }
  }
  return false;
}

console.log(search("hello", "ell")); //true
console.log(search("hello", "el"));  //true
console.log(search("hello", "ello"));//true
console.log(search("hello", "ho"));  //false
console.log(search("hello", ""));    //false
console.log(search("hello", "w"));   //false
console.log(search("abcdef", "abcdef")); //true
console.log(search("ab_cdef", "abcdef"));//false
console.log(search("adef", "abcdef"));   //false
console.log(search("wabcdefw", "abcdef"));//true
