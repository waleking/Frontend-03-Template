# 学习笔记
## 1. 重学HTML, HTML的定义：XML与SGML
- HTML：数据描述语言。
- HTML有一定的继承关系：来源于XML（SGML的子集）和SGML（20世纪60年代）。
- W3C对HTML进行了XML化的尝试，因此有了XHTML（没有流行起来）。
- HTML5是一门独立的语言。

XHTML的DTD与XML namespace
- http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
- http://www.w3.org/1999/xhtml
- 任何人在实现浏览器的时候不得访问w3.org的DTD.
- DTD是SGML规定的定义其子集的文档格式。
- HTML最初设计为SGML的子集，因此有DTD
- XHTML1.0对应于HTML4.2版本左右
  
[https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd](https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)定义了HTML中各个元素。本课程中需要参考的是如下三个Entity部分，包括[xhtml-lat1.ent](https://github.com/waleking/Frontend-03-Template/blob/master/week07/xhtml-lat1.ent.html)，[xhtml-symbol.ent](https://github.com/waleking/Frontend-03-Template/blob/master/week07/xhtml-symbol.ent.html)，[xhtml-special.ent](https://github.com/waleking/Frontend-03-Template/blob/master/week07/xhtml-special.ent.html)：
```
<!--================ Character mnemonic entities =========================-->

<!ENTITY % HTMLlat1 PUBLIC
   "-//W3C//ENTITIES Latin 1 for XHTML//EN"
   "xhtml-lat1.ent">
%HTMLlat1;

<!ENTITY % HTMLsymbol PUBLIC
   "-//W3C//ENTITIES Symbols for XHTML//EN"
   "xhtml-symbol.ent">
%HTMLsymbol;

<!ENTITY % HTMLspecial PUBLIC
   "-//W3C//ENTITIES Special for XHTML//EN"
   "xhtml-special.ent">
%HTMLspecial;
```
通过阅读[xhtml-lat1.ent.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/xhtml-lat1.ent.html)知道，多个空格不推荐使用nbsp，因为从注释里可以看出nbsp是一个non-breaking space，将两个词连成了一个词，使用时破坏了空格的语义。因此winter老师在使用多个空格的场景中推荐使用css中的white-space，具体的，可以使用white-space:pre。(pre可以保持white space的原样，pre-line将多个空格坍缩为1个，仅保留换行)。
```
&lt;!ENTITY nbsp   "&amp;#160;"&gt; <span class="COMMENT">&lt;!-- no-break space = non-breaking space,
                                  U+00A0 ISOnum --&gt;</span>
```

通过阅读[xhtml-symbol.ent](https://github.com/waleking/Frontend-03-Template/blob/master/week07/xhtml-symbol.ent.html)，可以知道希腊字母可以采用实体的方式输入到html中并加以显示，如代码[entities_symbol](https://github.com/waleking/Frontend-03-Template/blob/master/week07/entities_symbol.html)。

[xhtml-special.ent](https://github.com/waleking/Frontend-03-Template/blob/master/week07/xhtml-special.ent.html)中一定要记住的内容，否则直接输入<, >会报错，输入&会认为需要转义：
```
&lt;!ENTITY quot    "&amp;#34;"&gt; <span class="COMMENT">&lt;!--  quotation mark, U+0022 ISOnum --&gt;</span>
&lt;!ENTITY amp     "&amp;#38;#38;"&gt; <span class="COMMENT">&lt;!--  ampersand, U+0026 ISOnum --&gt;</span>
&lt;!ENTITY lt      "&amp;#38;#60;"&gt; <span class="COMMENT">&lt;!--  less-than sign, U+003C ISOnum --&gt;</span>
&lt;!ENTITY gt      "&amp;#62;"&gt; <span class="COMMENT">&lt;!--  greater-than sign, U+003E ISOnum --&gt;</span>
```

其他的知识点直接去看HTML5，因为HTML5不再需要xhtml的DTD，HTML5也不再认为自己是SGML的一个子集。

另外两个常用的namespace是MathML和SVG。

实际上，HTML5将HTML写法和XHTML的写法作为两种不同的语法供使用者选择：如果选择不包含self-closing tags的严格版本，那么使用XHTML版本的HTML5。

附：什么是HTML Entities？
根据[w3schools对HTML Entities的定义](https://www.w3schools.com/html/html_entities.asp)：Some characters are reserved in HTML. If you use the less than (<) or greater than (>) signs in your text, the browser might mix them with tags. Character entities are used to display reserved characters in HTML. A character entity looks like this: `&entity_name;` OR `&#entity_number;`
根据这一段描述，可以知道nbsp在html中的用法是`&nbsp;`，其效果可以参考[whitespace.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/whitespace.html)。

有关white space引起的layout的问题在[When does white space matter in HTML? | Patrick Brosset | Medium](https://medium.com/@patrickbrosset/when-does-white-space-matter-in-html-b90e8a7cdd33)做了详细说明，特别是这篇文章也涉及到了BFC和IFC，对于巩固CSS的知识很有帮助。

## 2. HTML标签语义
语义化标签设计时首要关心语义，其次再考虑表现。
- main标签在整个页面中只有一个，提示该部分是页面的主体部分。
- strong 表示重要, em表示重音。
- ol和ul的讨论，不能为了表现而去更改语义，而是先确定语义，然后用css更改表现。
- nav: 导航区的部分可以根据语义，将div替换为nav
- dfn: 提供定义，在表现形式上，默认的是斜体
- pre: 表示预先调整好格式的一段文本。从表现效果上看，类似于css中的white-space:pre
- code: 围绕一段代码

代码[wiki.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/wiki.html)的效果如下：
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week07/wiki.html.png?raw=true)

## 3. HTML语法
合法元素
- Element: `<tagname></tagname>`
- Text: text
- Comment: `<!-- comments -->`
- DocumentType: `<!Doctype html>`
- ProcessingInstruction: <?a 1?> 预处理，设计的不成功，在线上不应该出现带问号的语法
- CDATA: `<![CDATA[ ]]>`, CDATA不需要考虑转义的问题

## 4. 浏览器API | DOM API
DOM API的四个部分：
- 废的部分！traversal 系列
- 节点部分的API
- 事件部分的API
- Range API 更精确的操作DOM树，在HTML编辑器中使用
  
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week07/DOM_Node.png?raw=true)

导航类操作(节点Node导航)：
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling
  
导航类操作(元素Element导航，避免取到TextNode):
- parentElement（为了API能够对称，其实功能和parentNode一样）
- children
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling
  
修改操作
- appendChild
- insertBefore （没有insertAfter这个API的原因是为了保持最小化原则，insertBefore和appendChild一起就可以覆盖所有情况）
- removeChild（无法移除一个Node自身，但是可以通过访问parent来实现，返回oldChild）
- replaceChild（功能上相当于一次remove，然后一次insert；但是有的浏览器可能是一次性替换掉）

高级操作
- compareDocumentPosition 比较两个节点的关系。
- contains 检查一个节点是否包含另一个节点。
- isEqualNode 检查两个节点是否相同。The Node.isEqualNode() method tests whether two nodes are equal. Two nodes are equal when they have the same type, defining characteristics (for elements, this would be their ID, number of children, and so forth), its attributes match, and so on. 
- isSameNode 检查两个节点是否是同一个节点，等价于JavaScript中的===
- cloneNode 复制一个节点，如果传入参数为true，那么可以做deep copy
  

## 5. 事件API
此小节的内容完全参考[Bubbling and capturing](https://javascript.info/bubbling-and-capturing)。
### Bubbling
什么是Bubbling: When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.

以下是最简单的Bubbling的例子，当点击`<div>`下的`<em>`元素的时候，弹窗也出现。
```html
<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>
```
进一步的例子是[bubbling.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/wiki.html)：
```html
<form onclick="alert(`form, and event on ${window.event.target.tagName}`);">FORM
    <div onclick="alert(`div, and event on ${event.target.tagName}`)">DIV
        <p onclick="alert(`p, and event on ${event.target.tagName}`)">P</p>
    </div>
</form>
```
点击`p`元素之后，依次出现：`p and event on p`, `div and event on p`, `form and event on p`的弹窗。也就是事件如果发生在一个元素之上，首先由当前元素的handler来处理，然后由其父元素的handler来处理，然后依次是往外的祖先元素来处理。几乎所有的事件都会冒泡，除了个别的例如`focus`事件等。在冒泡过程中，handler看到的event带有属性target，表明事件是由哪一个element触发的。(event是Window.event的一个简写)
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week07/bubbling.png?raw=true)

**如何中止Bubbling呢？**
可以使用`event.stopPropagation()`，使得事件不再被ancestors处理。

### Capturing
根据[DOM Event Flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)标准的介绍，有三个阶段：capture phase, target phase, bubble phase。
![alt text](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

在如下代码中进行capturing和bubbling的练习，addEventListener中使用true来标记capturing。
```html
The capturing and the bubbling. 
<form id="capturing_and_bubbling">FORM
    <div>DIV
        <p>P</p>
    </div>
</form>
  
<script>
    debugger;
    for(let elem of document.querySelectorAll('#capturing_and_bubbling, #capturing_and_bubbling *')) {
        elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
        elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
    }
</script>
```
点击最内层的p元素之后，依次出现alert信息为：
```
Capturing Form
Capturing DIV 
Capturing P
Bubbling P
Bubbling DIV
Bubbling FORM
```
一个疑问，什么时候用capturing呢？

### winter老师的例子
```html
<div id="a" style="width:100%;height:300px;background-color: lightblue;">Outer
    <div id="b" style="width:100%;height:200px;background-color: pink;">Inner</div>
</div>

<script>
    let outer = document.getElementById("a");
    let inner = document.getElementById("b");
    inner.addEventListener("click", ()=>{console.log("clicked inner, capturing")}, true);
    outer.addEventListener("click", ()=>{console.log("clicked outer, capturing")}, true);
    inner.addEventListener("click", ()=>{console.log("clicked inner, bubbling")});
    outer.addEventListener("click", ()=>{console.log("clicked outer, bubbling")});
</script>
```
那么点击inner的运行结果如下：
```
clicked outer, capturing
clicked inner, capturing
clicked inner, bubbling
clicked outer, bubbling
```

如果我们将script代码中inner的事件的两个handler调换一下顺序：
```javascript
    inner.addEventListener("click", ()=>{console.log("clicked inner, bubbling")});
    outer.addEventListener("click", ()=>{console.log("clicked outer, bubbling")});
    inner.addEventListener("click", ()=>{console.log("clicked inner, capturing")}, true);
    outer.addEventListener("click", ()=>{console.log("clicked outer, capturing")}, true);
```
那么点击inner的运行结果如下，其原因如[bubbling and capturing| javascript.info](https://javascript.info/bubbling-and-capturing)所介绍：Note that while formally there are 3 phases, the 2nd phase (“target phase”: the event reached the element) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase。也就是说加在inner之上的capturing和bubbling都被当做target phase的event handler，那么其执行的先后顺序只和它们在代码中定义的先后顺序有关。
```
clicked outer, capturing
clicked inner, bubbling
clicked inner, capturing
clicked outer, bubbling
```

## 6. Range API
题外话：iterator API是一个处于淘汰状态的API。将一个元素的所有子元素逆序可以通过逆序加回来的办法来实现，[reverse.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/reverse.html)，但是需要做n-1(n是所有子元素的个数)次DOM操作，也需要n-1次重排，对性能影响很大：
```html
<style>
    body *{
        margin: 10px;
        border: 1px solid blue;
    }
</style>

<div id="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>

<button onclick="reverseByMethod1()">reverse</button>

<script>
    function reverseByMethod1(){
        const container = document.getElementById("container");
        const childList = document.querySelectorAll("#container *");
        //挪动节点的时候是不需要将它先remove再插入的, DOM树在insert的时候是自动先做remove操作的
        //for(let child of childList){
        //    container.removeChild(child);
        //}
        //挪动n-1个节点（最后一个不用挪）
        for(let i = childList.length -1 ; i>=0; i--){
            container.appendChild(childList[i]);
        }
    }
</script>
```

Range API的出场：操作半个节点或者批量操作节点。
```
range = new Range()
range.setStart(startNode, startOffset); #include startOffset 
range.setStart(endNode, endOffset); #exclude endOffset 
```
这里`半个节点`是什么意思呢？原因是TextNode中文字的存在：If the startNode is a Node of type Text, Comment, or CDataSection, then startOffset is the number of characters from the start of startNode. For other Node types, startOffset is the number of child nodes between the start of the startNode. 此处startNode是指Range.setStart(startNode, startOffset)中的startNode。

在文本编辑器中，可以处理文本高亮的情况：`document.getSelection().getRangeAt(0)`。由于有空白的TextNode，因此手工设置offset不容易，我们使用如下API：
```
range = new Range()
range.setStartBefore()
range.setEndBefore()
range.setStartAfter()
range.setEndAfter()

range.selectNode() #此时和node API差不多
range.selectNodeContents() #选中一个元素的所有内容
```

如何使用建立好的range：
```
var fragment = range.extractContents() #相当于删的操作
range.insertNode(document.createTextNode("aaaa")) #相当于增加的操作
```

fragment是Node的一个子类。当appendChild的对象是fragment的时候，可以将fragment中所有的node加到DOM树中，这一特性可以让我们完成一些很精细的DOM树的操作。fragment上也可以做querySelector等DOM树上的操作，也可以addEventListener。React加了fragment对象，其底层也是用DOM的fragment去实现的。如下[reverse.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/reverse.html)只用操作两次DOM树就能实现所有子元素的翻转，整个过程只进行了两次重排。
```html
<style>
    body *{
        margin: 10px;
        border: 1px solid blue;
    }
</style>

<div id="container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>

<button onclick="reverseByRange()">reverse by range</button>

<script>
    //author: winter
    function reverseByRange(){
        const container = document.getElementById("container");
        const range = new Range();
        range.selectNodeContents(container);

        // DOM operation 1
        const fragment = range.extractContents();
        debugger;
        let l = fragment.children.length;
        while(l-- >0){
            fragment.appendChild(fragment.children[l]);
        }
        // DOM operation 2
        container.appendChild(fragment);
    }
</script>
```

对DOM树要高效操作的话，可以使用range和fragment这一对搭档。