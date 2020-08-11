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

在winter老师的演示中，一共处理了13种状态，如下表格所示。

|ToyBrowser中的状态   | 对应的html.spec.whatwg.org中的状态  |
|---|---|
|data   |[12.2.5.1 Data state](https://html.spec.whatwg.org/multipage/parsing.html#data-state)   |
|tagOpen   | [12.2.5.6 Tag open state](https://html.spec.whatwg.org/multipage/parsing.html#tag-open-state)  |
|endTagOpen   |[12.2.5.7 End tag open state](https://html.spec.whatwg.org/multipage/parsing.html#end-tag-open-state)   |
|tagName   | [12.2.5.8 Tag name state](https://html.spec.whatwg.org/multipage/parsing.html#tag-name-state)|
|beforeAttributeName | [12.2.5.32 Before attribute name state](https://html.spec.whatwg.org/multipage/parsing.html#before-attribute-name-state)|
|afterAttributeName  | [12.2.5.34 After attribute name state](https://html.spec.whatwg.org/multipage/parsing.html#after-attribute-name-state) |
|attributeName       | [12.2.5.33 Attribute name state](https://html.spec.whatwg.org/multipage/parsing.html#attribute-name-state) |
|beforeAttributeValue| [12.2.5.35 Before attribute value state](https://html.spec.whatwg.org/multipage/parsing.html#before-attribute-value-state)|
|doubleQuotedAttributeValue | [12.2.5.36 Attribute value (double-quoted) state](https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(double-quoted)-state) |
|singleQuotedAttributeValue | [12.2.5.37 Attribute value (single-quoted) state](https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(single-quoted)-state)|
|afterQuotedAttributeValue | [12.2.5.39 After attribute value (quoted) state](https://html.spec.whatwg.org/multipage/parsing.html#after-attribute-value-(quoted)-state)|
|unquotedAttributeValue | [12.2.5.38 Attribute value (unquoted) state](https://html.spec.whatwg.org/multipage/parsing.html#attribute-value-(unquoted)-state)|
|selfClosingStartTag | [12.2.5.40 Self-closing start tag state](https://html.spec.whatwg.org/multipage/parsing.html#self-closing-start-tag-state)|

调试的方法以测试驱动为主，通过打断点判断有没有进入正确的状态机；如果在某个状态机中有问题，查阅上述表格，判断是否和标准中所列的状态转换一致。
注意：在某些逻辑分支中不要忘记reconsume input character。
