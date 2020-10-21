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
构造字典树(Trie Tree)，代码为[1-字典树.html](1-字典树.html)。
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
KMP算法利用了模式串里面自身可能有重复性这一特点。因此在KMP算法刚开始的时候，先计算模式串的自重复性。
使用表格记录模式串中的自重复性。跳转表格？

KMP算法大致分为两部分：1.求跳转表格；2.进行真正的匹配。
代码为[kmp.js](kmp.js)。
## 4. 字符串分析算法 | Wildcard
一个wildcar可视作多个KMP组成。例如：`ab*cd*abc*ad`中有开头ab和结尾ad，那么相当于在字符串中间找cd和abc（保持顺序）。

另一个处理思路是用正则来处理多个KMP的段。
头尾进行一般的完全匹配，中间的部分使用正则表达式进行匹配，其中的?号通配符可以先行替换，替换为全部字符[\s\S]。
需要注意的是：如果index超出数组的范围，那么返回的是undefined。通过检查`(void 0)===(void 0)`发现恒为`true`。
那么我们就可以在遍历数组的时候不用太担心数组越界的问题，事实上`if(source[source.length - indexFromTail] !== pattern[pattern.length - indexFromTail] && pattern[pattern.length - indexFromTail]!=="?")`这个条件语句存在数组越界的情况，例如indexFromTail=0，那么会访问source[source.length]！但是因为source[source.length]是undefined，同时pattern[pattern.length]也是undefined，那么越界时恒为true，不影响最终结果。

代码为[wildcard.js](wildcard.js)。