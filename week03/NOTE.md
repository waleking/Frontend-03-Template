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
截止到目前为止，是词法分析。

### 用token构建DOM树
进入到HTML语法分析阶段。HTML的语法分析是简单的，ToyBrowser中可以用栈来处理。真正的浏览器对使用者友好，栈是不够用的。
更为复杂的部分需要参考[12.2.6 Tree construction](https://html.spec.whatwg.org/multipage/parsing.html#tree-construction)。


栈和树之间是有天然的联系的：“任何一个树的截面，它的父元素父元素父元素可以视作一个栈”。
HTML中写在尖括号里面的东西是tag，其背后的抽象的东西叫element。
DOM树中只有node和element?

`top.children.push(element)`和`element.parent = top`用于建立父子关系。

### 将文本节点加到DOM树
文本节点并不入栈，但是需要将文本节点挂到栈顶的chilren队列中。

### 收集CSS规则 
CSS Computing就是指将CSS规则添加到DOM树中。
需要对CSS进行词法分析和语法分析，其中的编译原理知识略过，改用`npm install css`，其作用为将css转为AST（抽象语法树）。
进一步降低处理的复杂程度，不考虑link标签，只考虑style标签；不考虑style标签里面的import写法（涉及到网络请求和异步处理），只考虑内联的css写法。

一条css rule主要由selectors，declarations组成。selectors是一个list：`body div img, #myid`会通过逗号分隔，变成两个selectors。

### 添加对CSS的调用
CSS设计里面的潜规则：尽量保证大部分的选择器在进入startTag的时候就会被判断。
一个重要的假设：在compute css的时候，css rules已经收集完毕。在真实浏览器中，可能遇到写在body中的style标签，需要重新计算CSS，这里我们忽略这种情况。

### 获取父元素序列
为什么要获取父元素序列呢？选择器大多都和父元素相关？因为这里要实现[descendant combinator](https://www.w3.org/TR/selectors/#descendant-combinators)。

在computeCSS函数中，我们必须知道元素的所有祖先元素才能判断元素是否与规则匹配。我们从上一步骤的stack，可以获取本元素的所有祖先元素。因为我们首先获取的是“当前元素”，所以我们进行匹配的顺序是从内到外。

例如：选择器`div div #myid`中的第一个div不知道匹配哪个元素，但是#myid一定要判断是否匹配当前元素。

Example 1, `div p` = Selects all <p> elements inside <div> elements
Example 2, `div > p` = Selects all <p> elements where the parent is a <div> element
Reference: https://www.w3schools.com/cssref/css\_selectors.asp

### 选择器与元素的匹配
实现了3种简单选择器和元素的匹配，分别是ID选择器，class选择器，tagName选择器。
其中class选择器是元素中有单一class的情况，元素中有多个class的情况未去实现。


### 生成computed属性
一旦选择器匹配，就应用选择器到元素上，形成computedStyle。

简单地将属性抄写到了element的computedStyle属性上，并未处理css优先级(specificity)。

### specificity的计算逻辑
specificity是专指程度（通常理解的优先级）。专指程度：ID selector> class selector> tagName selector。

specificity用一个四元组来表示，第一位是inline位置，第二位是id位置，第三位是class位置，最后一位是tagName位置。
例如，复杂选择器`div div #id`的specificity是`[0, 1, 0, 2]`；另有一个复杂选择器`div #my #id`的specificity是`[0, 2, 0, 1]`。
specificity采用从左比较到右的非进位制比较。

1. CSS规则根据specificity和后来优先规则覆盖
2. specificity是个四元组，越左边权重越高
3. 一个CSS规则的specificity根据包含的简单选择器相加而成


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
### 获取父元素序列
在此节，处理[descendant combinator](https://www.w3.org/TR/selectors/#descendant-combinators)。为了让DOM树中的节点能够匹配到descendant combinator，并让逻辑更简明一些，对winter老师的代码进行了改动，更新为comapreTwoArray函数。将问题转化为两个数组arrA和arrB的比较：arrA的所有元素都出现在arrB中；并且匹配上的元素保持有arrA的原有顺序；并且首元素相等。对此，对入栈的代码也做了改动：startTag统统入栈，然后computeCSS，最后对于self-closed startTag进行出栈操作。`compareFunc`为传入的比较元素是否相等的函数，对应于parse.js代码中的`match`函数。

另外，上述操作能够成功处理.class中间有空格的情形。
首先明确的是.class1 .class2 和 .class1.class2 是两种不同的选择规则。
* 中间有空格的情况：是选择到.class1类下的.class2类子节点，即.class2类的节点要是.class1类子节点。
这种情形符合[descendant combinator](https://www.w3.org/TR/selectors/#descendant-combinators)的定义：A descendant combinator is whitespace that separates two compound selectors. 只要我们能处理好descendant combinator，以及处理好compound selector和元素的比较，就能自动的推广到.class中间有空格的情形。
* 中间无空格的情况：是选择到同时拥有.class1和.class2的节点，属于compound selector。
```
/**
 * arrA should be in arrB with arrA's original order, and arrA[0] === arrB[0]
 * @param {*} arrA 
 * @param {*} arrB 
 */
function comapreTwoArray(arrA, arrB, compareFunc){
    if(!arrB){
        return false;
    }
    if(!arrA){
        throw new Error("arrA should not be empty");
    }
    if(!compareFunc(arrA[0],arrB[0])){
        return false;
    }
    let aIdx = 1;
    for(let i = 1; i < arrB.length; i++){
        if(compareFunc(arrA[aIdx], arrB[i])){
            aIdx++;
        }
    }
    if(aIdx < arrA.length){
        return false;
    } else {
        return true;
    }
}
```
### CSS选择器与元素匹配
简单选择器，如class选择器，ID选择器可以在如下链接中找到标准定义：
[6.6. Class selectors](https://www.w3.org/TR/selectors/#class-selector)，
[6.7. ID selectors](https://www.w3.org/TR/selectors/#id-selector)

对于[复合选择器](https://www.w3.org/TR/selectors/#typedef-compound-selector)，其w3.org定义如下：
```
<compound-selector> = [ <type-selector>? <subclass-selector>*
                        [ <pseudo-element-selector> <pseudo-class-selector>* ]* ]!
```
在不考虑pseudo的情况下，我们的compound selector应该写成如下形式：
```
<compound-selector> = [ <type-selector>? <subclass-selector>* ]!
```
[关于感叹号!(must req)的解释](https://www.w3.org/TR/css-values-4/#mult-req):
```
An exclamation point (!) after a group indicates that the group is required and must produce at least one value; even if the grammar of the items within the group would otherwise allow the entire contents to be omitted, at least one component value must not be omitted.
```
[subclass-selector](https://www.w3.org/TR/selectors/#typedef-subclass-selector):
```
<subclass-selector> = <id-selector> | <class-selector> |
                      <attribute-selector> | <pseudo-class-selector>
```

在进行一系列简化之后，我们的compound selector的正则写法是：
```
<compound-selector> = \w+((\.\w+))*(\#\w+)|\w+((\.\w+))+(\#\w+)?|(\.\w+){2,}|(\.\w+)+(\#\w+)
```
其中，`\w+`来表示tagName selector, `\.\w+`表示class selector，`\#\w+`表示ID selector。
我们认为tagName selector最多出现一次，class selector可以出现多次，ID selector最多出现一次。
用`div`来对tagName selector举例，用`.a`，`.b`对class selector举例，用`#chapter1`对ID selector举例。
可以有如下五种情况：
1. `div#chapter1`，type (tagName) selector出现一次，ID selector出现一次，对应正则表达式第一部分`\w+((\.\w+))*(\#\w+)`。
2. `div.a#chapter1`，type (tagName) selector出现一次，class selector不出现或出现一次以上，ID selector出现一次，对应正则表达式第一部分`\w+((\.\w+))*(\#\w+)`。
3. `div.a.b`，type (tagName) selector出现一次，class selector出现一次以上，对应正则表达式第二部分`\w+((\.\w+))+(\#\w+)?`。
4. `.a.b`，class selector出现两次或以上，对应正则表达式第三部分`(\.\w+){2,}`。
5. `.a#chapter1`，class selector出现一次以上，ID selector出现一次，对应正则表达式`(\.\w+)+(\#\w)`。

用如下脚本测试以确认正则表达式的正确性。
```
const compoundSelectorRegex = /\w+((\.\w+))*(\#\w+)|\w+((\.\w+))+(\#\w+)?|(\.\w+){2,}|(\.\w+)+(\#\w+)/;

const caseArr = [
  "div.a.b", //true
  "div#a",   //true
  ".a.a",    //true
  "div#chapter1", //true
  "div.a.b", //true
  ".a.b",    //true
  ".a#chapter1",  //true
  ".a",      //false
  "#chapter1",    //false
  "div"     //false
];

caseArr.forEach(
  (item) => {
    if(item.match(compoundSelectorRegex)){
      console.log("true");
    }else{
      console.log("false");
    }
  });
```

compound selector通过正则表达式匹配通过之后，再单独抽取TagName selector，class selector，ID selector。

### 生成computed属性
首先查看rule的数据结构，包含有selectors，有declarations。以下为复合选择器`div.a`对应的declarations。
```
div.a{
    width: 30px;
    background-color: #ff1111;
}
```
第一条declaration包含"property":"width","value":"30px"；第二条declaration包含"property":"background-color","value":"#ff1111"。
```
{"type":"rule","selectors":["div.a"],"declarations":[{"type":"declaration","property":"width","value":"30px","position":{"start":{"line":11,"column":5},"end":{"line":11,"column":16}}},{"type":"declaration","property":"background-color","value":"#ff1111","position":{"start":{"line":12,"column":5},"end":{"line":12,"column":30}}}],"position":{"start":{"line":10,"column":1},"end":{"line":13,"column":2}}}
```

### specificity的计算逻辑
此节需要注意的是specificity是以declaration为单位的，而不是以rule为单位。
例如，style中有三条规则能够应用到某个img标签：
```
body div #myid{
    width: 100px;
    background-color: #ff5000;
}
body div img{
    width: 30px;
    background-color: #ff1111;
}
img{
    color: red;
}
```
那么该img的computedStyle为：
```
"computedStyle": {
"width": {
    "value": "100px",
    "specifity": [
        0,
        1,
        0,
        2
    ]
},
"background-color": {
    "value": "#ff5000",
    "specifity": [
        0,
        1,
        0,
        2
    ]
},
"color": {
    "value": "red",
    "specifity": [
        0,
        0,
        0,
        1
    ]
}
```
