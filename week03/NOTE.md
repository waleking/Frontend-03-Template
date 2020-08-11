# 学习笔记

## 课程记录
### 用FSM实现HTML的解析
 
[HTML标准](https://html.spec.whatwg.org/multipage/)是写给浏览器实现者看的。

### 解析标签
html标签(tag)有三种：开始标签，结束标签，自封闭标签。

HTML中有效的空白符有四种：制表符、换行符、禁止符、空格。

### 创建元素
在状态机中添加计算逻辑。

### 处理属性

## 作业心得
### 处理属性
此处使用了状态机处理属性，但是逻辑相对于标签的处理更复杂一些。
翻阅[html.spec.whatwg.org](https://html.spec.whatwg.org/)的文档，可以了解一些编码的方法。
以如下`afterAttributeName()`代码为例。
```
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
```
可以找到对应的[12.2.5.34 After attribute name state](https://html.spec.whatwg.org/multipage/parsing.html#after-attribute-name-state)的规范。
每一个条件认为对应于一个switch case，前四个case合并为`c.match(/^[\t\n\f ]$/)`，其中\t是CHARACTER TABULATION (tab)，\n是LINE FEED (LF)，\f是FORM FEED (FF)，空格是U+0020 SPACE。将标准中的伪代码严格翻译为JavaScript代码就得到了我们的`afterAttributeName`函数。
```
Consume the next input character:

U+0009 CHARACTER TABULATION (tab)
U+000A LINE FEED (LF)
U+000C FORM FEED (FF)
U+0020 SPACE
    Ignore the character.
U+002F SOLIDUS (/)
    Switch to the self-closing start tag state.
U+003D EQUALS SIGN (=)
    Switch to the before attribute value state.
U+003E GREATER-THAN SIGN (>)
    Switch to the data state. Emit the current tag token.
EOF
    This is an eof-in-tag parse error. Emit an end-of-file token.
Anything else
    Start a new attribute in the current tag token. Set that attribute name and value to the empty string. Reconsume in the attribute name state.
```
