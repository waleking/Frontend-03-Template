function kmp(source, pattern){
    // 计算跳转表格table
    let table = (new Array(pattern.length)).fill(0);
    {
        let i = 1;// 自重复字符串开始的位置
        let j = 0;// 重复的次数
        while(i < pattern.length){
            if(pattern[i] === pattern[j]){//?
                ++i;//?
                ++j;//?
                table[i] = j; // i 的位置的重复数是j
            } else {
                if(j > 0){
                    j = table[j]; //?
                } else {
                    // table[i] = j;
                    ++i;
                }
            }
        }
    }
    // 匹配
    {
        let i = 0;// index in the source string
        let j = 0;// index in the pattern string
        while(i < source.length){
            if(pattern[j] === source[i]){
                ++i;
                ++j;
            } else {
                if(j > 0){
                    j = table[i];
                } else {
                    ++i;
                }
            }
            if(j === pattern.length){ 
                return true;
            }
        }
        return false;
    }
}
console.log(kmp("hello", "ll"));
console.log(kmp("helxlo", "ll"));
console.log(kmp("abcdabcdabcex", "abcdabce"));
console.log(kmp("source", "abcdabce"));
console.log(kmp("source", "abababab"));
console.log(kmp("source", "aabaaac"));
console.log(kmp("abc", "abc"));