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

附：什么是HTML Entities？
根据[w3schools对HTML Entities的定义](https://www.w3schools.com/html/html_entities.asp)：Some characters are reserved in HTML. If you use the less than (<) or greater than (>) signs in your text, the browser might mix them with tags. Character entities are used to display reserved characters in HTML. A character entity looks like this: `&entity_name;` OR `&#entity_number;`
根据这一段描述，可以知道nbsp在html中的用法是`&nbsp;`，其效果可以参考[whitespace.html](https://github.com/waleking/Frontend-03-Template/blob/master/week07/whitespace.html)。

有关white space引起的layout的问题在[When does white space matter in HTML? | Patrick Brosset | Medium](https://medium.com/@patrickbrosset/when-does-white-space-matter-in-html-b90e8a7cdd33)做了详细说明，特别是这篇文章也涉及到了BFC和IFC，对于巩固CSS的知识很有帮助。
