function search(s, target){
  for(let i = 0; i < s.length - 1; i++){
    if(s[i]===target[0]){
      if(s[i+1] === target[1]){
        return true;
      }
    }
  }
  return false;
}
console.log(search("  ab c", "ab")); // true
console.log(search("  a", "ab"));    // false
console.log(search("a", "ab"));      // false
console.log(search("a b", "ab"));    // false
console.log(search("ab c", "ab"));   // true
