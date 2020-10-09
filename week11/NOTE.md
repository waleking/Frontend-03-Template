# 学习笔记

## 1. 字符串分析算法 | 总论
- 字典树
  - 大量高重复字符串的存储和分析
  - 如：搜索关键词
- KMP
  - 在长字符串里找模式
  - 复杂度是O(m+n)
- Wildcard
  - 带通配符的字符串模式
  - 在KMP的基础上增加了通配符，只有两种通配符
- 正则
  - 字符串通用模式匹配
- 状态机
  - 通用的字符串分析
- LL LR
  - 字符串多层级结构分析
  - HTML解析用到了stack，其实也是LR方法
## 2. 字符串分析算法 | 字典树
构造字典树(Trie Tree)
```javascript
<script>
    class Trie {
        constructor(){
            this.root = Object.create(null);//避免受到Object prototype上的一些污染
        }
        insert(word) {
            let node = this.root; // node用于遍历这棵树
            for(let c of word){
                if(!node[c]){
                    node[c] = Object.create(null);
                }
                node = node[c];
            }
            if(!("$" in node)){//$是结束符号
                node["$"] = 0;//为什么是0？用于表示频次，初始化为0
            }

            node["$"]++;
        }
    }

    let trie = new Trie();
    for(let word of ["3499", "0015", "0002", "0007"]){
        trie.insert(word);
    }
    console.log(JSON.stringify(trie));
</script>
```
输出结果：
```json
{
  "root": {
    "0": {
      "0": {
        "0": {
          "2": {
            "$": 1
          },
          "7": {
            "$": 1
          }
        },
        "1": {
          "5": {
            "$": 1
          }
        }
      }
    },
    "3": {
      "4": {
        "9": {
          "9": {
            "$": 1
          }
        }
      }
    }
  }
}
```

类似的，在Trie中添加numLeafs()函数，可以显示字典树中有多少叶子节点。
```javascript
    numLeafs() {
        let totalLeafs = 0;
        let visit = (node, word) => {
            if(node[$]) {
                totalLeafs+=1;
            } else {
                for(let p in node){
                    visit(node[p], word+p);
                }
            }
        }
        visit(this.root, "");
        return totalLeafs;
    }
```

## 3. 字符串分析算法 | KMP字符串模式匹配算法
## 4. 字符串分析算法 | Wildcard