# 学习笔记

## 课程笔记
### CSS语法的研究
CSS2.1的语法
https://www.w3.org/TR/CSS21/grammar.html#q25.0

CSS2.1语法的总体结构
```
@charset
@import
rules
    rule
    @media
    @page
```

### CSS @规则的研究
- @charset: https://www.w3.org/TR/css-syntax-3/#at-ruledef-charset
- @import: https://www.w3.org/TR/css-cascade-4/#at-ruledef-import
- @media: https://www.w3.org/TR/css3-conditional/#at-media          media query相当于一个预置函数
- @page: https://www.w3.org/TR/css-page-3/#at-page-rule             page和打印机相关，打印机这里就是分页媒体 
- @counter-style: https://www.w3.org/TR/css-counter-styles-3/       列表相关
- @keyframes: https://www.w3.org/TR/css-animations-1/               定义动画
- @fontface: https://www.w3.org/TR/css-fonts-3/                     web font相关，定义一切字体，衍生技巧是icon font.
- @supports: https://www.w3.org/TR/css3-conditional/                检查一些css功能是否存在，其本身有兼容性问题，不推荐用support检查兼容性
- @namespace: https://www.w3.org/TR/css-namespaces-3/               处理svg，mathml这样的其他的命名空间

### CSS 规则的结构
CSS规则
- 选择器 (selector)
- 声明 (declaration)
  - Key
  - Value

CSS rule涉及到的标准
- Selector
  - https://www.w3.org/TR/selectors-3/ (Level 3 标准执行的较好)
  - https://www.w3.org/TR/selectors-4/ (level 4 标准尚在制定中)
- Key
  - Properties
  - Variables: https://www.w3.org/TR/css-variables/ （双减号，--)
- Value
  - https://www.w3.org/TR/css-values-4/ （有正常的值，也包含一些函数类型的值；不同属性要求不同的value）

如何阅读CSS rule相关的标准
- 通过产生式`selectors_group: selector [ COMMA S* selector ]*;` 可以知道逗号的优先级是最低的，结合性排在最后。
- 通过产生式`selector: simple_selector_sequence [ combinator simple_selector_sequence ]*;`可以知道selector可以由simple_selector_sequence之间通过combinator连接得到；combinator的产生式为`combinator /* combinators can be surrounded by whitespace */ : PLUS S* | GREATER S* | TILDE S* | S+;`，PLUS代表紧邻的sibling，GREATER代表parent-child，TILDE（波浪）代表非紧邻的sibling，S+（空格）代表后代。
- 通过产生式`simple_selector_sequence: [ type_selector | universal ] [ HASH | class | attrib | pseudo | negation ]* | [HASH | class | attrib | pseudo | negation ]+;` 可以知道`type_selector`是tag name selector，universal是*号，HASH带#号，class带.号，attrib带[]号，pseudo是伪类选择器（单冒号或者双冒号），negation是带NOT的选择器（以:NOT开头）。进一步的，通过查阅词法(https://www.w3.org/TR/selectors-3/#lex)知道`"#"{name}        return HASH;`，说明HASH是一个ID选择器，class是一个类选择器。通过产生式中的`*`号和`+`号可以将简单选择器组合为复合选择器（中间没有空格）。
- 通过阅读Value部分的Font-relative lengths(https://www.w3.org/TR/css-values-4/#font-relative-lengths)，知道em, ex, cap, ch, ic, rem, lh, rlh和字体相关；Viewport-percentage lengths (https://www.w3.org/TR/css-values-4/#viewport-relative-lengths)知道vw, vh, vi, vb, vmin, vmax和视口(viewport)相关；Absolute lengths: the cm, mm, Q, in, pt, pc, px为绝对长度相关，最常用的是px。厘米和毫米不会真的产生厘米或者毫米的效果，都是依据px进行计算。https://www.w3.org/TR/css-values-4/#calc-notation 涉及到数学函数。attr函数？

### 小实验：收集CSS标准

### 选择器语法
type selector (tag name selector)可以在三种命名空间中：html, svg, mathml。例如，如果tag name `a`是在svg命名空间中那么就写作：`svg|a`。

### 选择器的优先级
- css2.1中计算selector的优先级：https://www.w3.org/TR/2011/REC-CSS2-20110607/cascade.html#specificity
- css3中计算selector的优先级：https://www.w3.org/TR/2018/REC-selectors-3-20181106/#specificity

练习：
请写出下面选择器的优先级： 
- div#a.b .c[id=x] 0 1 3 1 
- #a:not(#b) 0 2 0 0 
- *.a 0 0 1 0 
- div.a 0 0 1 1

css2.1中计算selector的优先级：https://www.w3.org/TR/2011/REC-CSS2-20110607/cascade.html#specificity
A selector's specificity is calculated as follows:

- count 1 if the declaration is from is a 'style' attribute rather than a rule with a selector, 0 otherwise (= a) (In HTML, values of an element's "style" attribute are style sheet rules. These rules have no selectors, so a=1, b=0, c=0, and d=0.)
- count the number of ID attributes in the selector (= b)
- count the number of other attributes and pseudo-classes in the selector (= c)
- count the number of element names and pseudo-elements in the selector (= d)

以及关于:not的情况出现在https://www.w3.org/TR/2018/REC-selectors-3-20181106/#specificity
```
Selectors inside the negation pseudo-class are counted like any other, but the negation itself does not count as a pseudo-class.
```

### 伪类(pseudo class)
最初设计的一批伪类，依据链接/行为：
- :any-link 所有链接
- :link     还未访问过的链接
- :visited  访问过的链接
- :hover    
- :active
- :focus    获得焦点
- :target

树结构
- :empty    对computeCSS的计算时机提出了新要求，需要再等一个token判断children数组是否空，破坏**CSS不回溯原则**，影响性能，不推荐使用
- :nth-child    可以写得很复杂，但是建议只使用最简化的用法
- :nth-last-child   破坏**CSS不回溯原则**，影响性能，不推荐使用
- :first-child  没有影响computeCSS的计算时机
- :last-child   破坏**CSS不回溯原则**，影响性能，不推荐使用
- :only-child   破坏**CSS不回溯原则**，影响性能，不推荐使用

逻辑型
- :not 伪类 写得越简单越好
- :where    Level 4，实现的还不是很好
- :has      Level 4，实现的还不是很好

如果选择器写得过于复杂，一定是HTML结构设计的不合理。

### 伪元素
What are Pseudo-Elements? (https://www.w3schools.com/css/css_pseudo_elements.asp)
- A CSS pseudo-element is used to style specified parts of an element.
- For example, it can be used to:

  - Style the first letter, or line, of an element
  - Insert content before, or after, the content of an element

常用的伪元素有如下四种：
- ::before          
- ::after
- ::first-line
- ::first-letter


如果使用了伪元素`::before`或`::after`，就可以在declaration中添加`content`属性。
只要定义`content`属性，那么其内容就可以像真正的DOM元素一样，生成盒（什么是盒？），参与排版和渲染。
伪元素`::before`和`::after`可以理解为通过选择器，向界面上添加了一个不存在的元素。
`::before`和`::after`可以任意指定display，比如inline或者inline-block，block。
例如，如下的示意代码中（<::before/>, <::after/> invalid，仅表示伪元素所在位置），在div文本内容的末尾添加一个元素，显示google logo。
在设计组件时，可以使用这两种伪元素在不污染DOM树的前提下，提供一些渲染效果。
```
<style>
div::after{
  content: url(https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png);
}
</style>
...
<div>
<::before/>
content content content content
content content content content
content content content content
content content content content
content content content content
content content content content
<::after/>
</div>
```


`::first-line`，`::first-letter`则不一样，其本身有content属性，它的处理方式不是添加不存在的元素，而是：将已有的文本括了起来，让我们对括起来的文本进行处理。
用`::first-letter`来实现比JS实现更加稳定。`::first-line`针对的是排版后的第一行进行修饰，`::first-line`会根据屏幕宽度自适应。

`::first-line`的可用属性：
- font
- color
- background
- word-spacing
- letter-spacing
- text-decoration 下划线（underline)，  文字中间的线（line-through)，文字之上的线（overline)
- text-transform 大小写
- line-height

`::first-letter`的可用属性（*斜体*部分表示相对于`::first-line`增加的可用属性）：
- font
- color
- background
- word-spacing
- letter-spacing
- text-decoration
- text-transform
- line-height
- *float*
- *vertical-align*
- *盒模型系列：margin, padding, border*


### 思考题
思考题：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢（first-line不能变成float）？
首先要搞清楚什么是`float`属性？如下是[w3schools](https://www.w3schools.com/css/css_float.asp)给出的解释。

The float property is used for positioning and formatting content e.g. let an image float left to the text in a container. The float property can have one of the following values:
- left - The element floats to the left of its container
- right - The element floats to the right of its container
- none - The element does not float (will be displayed just where it occurs in the text). This is default
- inherit - The element inherits the float value of its parent

依据[MSDN web docs: In Flow and Out of Flow](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/In_Flow_and_Out_of_Flow)对floated items的解释：As a float it is first laid out according to where it would be in normal flow, then taken out of flow and moved to the left as far as possible. 
可以了解到float将会使得对应的盒离开normal flow，然后移动到container的最左侧或者最右侧。::first-letter能够被选中并移动。

依据[w3对first-line的定义](https://www.w3.org/TR/selectors-3/#first-line)The ::first-line pseudo-element describes the contents of the first formatted line of an element. 
如果::first-line也使用float，那么原来的the first formatted line在脱离文档流重新排版的过程中，会变得不是the first formatted line，这和原来的设计意图不相吻合，因此不支持::first-line的float属性。