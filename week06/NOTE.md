# 学习笔记
## 课程笔记
### 1. CSS排版：盒

标签Tag：源代码，元素Element：语义，盒Box：表现

- HTML代码中可以书写开始`标签`，结束`标签` ，和自封闭`标签`。
- 一对起止`标签`，表示一个`元素`。
- DOM树中存储的是`元素`和其它类型的节点（Node）。
- CSS选择器选中的是`元素`（或者伪元素）。
- CSS选择器选中的`元素`，在排版时可能产生多个`盒`？例如inline元素因为分行而产生多个盒。
- 排版和渲染的基本单位是`盒`。对应的是盒模型：content, padding（内边距）, border, margin（外边距）。padding影响盒内的排版，margin影响盒本身的排版。

### 2. CSS排版：正常流 (normal flow)
三代排版技术：
- normal flow（和正常书写文字的习惯一致）
- flex  （主流）
- grid （用的还较少）

排版关心两件事情：将盒放到正确的位置，将文字放到正确的位置。

正常流排版：
- 收集盒和文字进行(hang)
- 计算盒和文字在行中的排布
- 计算行的排布

两种盒子：
- 块级盒 block-level box
- 行盒 line box （包括inline box和文字），行盒内部从左到右排布

两个方向上的排布：
- BFC: Block-level Formating Context 块级格式化上下文信息
- IFC: Inline-level Formating Context 行级格式化上下文信息

和BFC相关的知识：`设立BFC`
### 3. CSS排版：正常流的行级排布
盒会影响line-top和line-bottom，但是不会影响text-top和text-bottom. 
### 4. CSS排版：正常流的块级排布
正常流的两个非常复杂的机制：`float`和`clear`，以及一个现象`margin`折叠。
- `float`已经脱离了正常流，但是它依赖于正常流而定义。float元素排布时影响其高度占据范围内的所有行盒。超出float元素高度范围的不再考虑。如果有两个float元素，那么下一个float元素能浮动的位置受上一个float元素影响（不会占据上一个float元素的位置）。这样会产生两个float元素在视觉上相互挤靠堆叠的现象（不是一个盖住另一个，而是一个挤在另一个边上).
如代码[float.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float.html)所显示的那样：
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float.png?raw=true)
- `clear`用于解决上面两个float相互挤靠堆叠的问题，clear元素的语义不是清除float的意思，而是找一个干净的空间，然后进行浮动（a.k.a., 移动）。具体的，`clear:right`意思是找到右边一块干净的空间然后执行float操作。如代码[float_clear.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float_clear.html)，新的排布更干净整齐。`clear`最终表现出来是在纵向上寻找干净的位置，也就是说会改变原来排布中整体的纵向的高度。![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float_clear.png?raw=true)
- `float`和`clear`的一种早期用法：模拟flex box（尽管当时没有flex排布，但是已经有了类似于flex排布的需求）。在真正的排布中很少遇到图文混排的情况，基本上都是对`<div>`进行排布，而div是块级排布，会占据新的一行。因此用float来脱离正常流，然后重排，利用多个float会相互挤靠堆叠的效果，可以排进同一行。此外，使用`clear`来强制换行。如代码[float2.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float2.html)显示的如下效果：![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float2.png?raw=true)
- `float`导致的重排的现象，特别是`float:left`。代码[float3.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float3.html)显示如下。`float:left`首先让`div`不再占据新的行，而是和第四行文字处于同一行，然后通过`float:left`挤到左边。
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float3.png?raw=true)
- `float`只推荐在一个场景中使用：图文绕排。第二代flex和第三代grid排版技术基本不再使用float。
- magin折叠（margin collapse）：在BFC中，当两个盒占据相邻的两行，两个盒的margin会相互重叠。最后叠出来的高度和最大的那个margin相等。也就是说从两个margin变为了一个margin，所以称之为`margin collapse`。这和margin的定义相吻合：margin只要求box周围有这么大的留白就可以了，而折叠不会影响到这个留白的大小。margin collapse是非常自然的排版思路。需要注意的是margin collapse只发生在BFC中，不会发生在IFC或者flex，grid中。代码[margin.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/margin.html)展示了margin collapse的效果：![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/margin.png?raw=true)
### 5. CSS排版：BFC合并
正常流中最困难的部分：BFC合并。
- Block Container：里面有BFC的，但本身不是block-level box，可以为其内容设立正常流所需的环境。如：
  - inline-block
  - table-cell
  - flex item
  - grid cell
  - table caption
- Block-level Box（产生line break的）: 外面有BFC的，处于正常流当中的。
- Block Box = Block Container + Block-level Box：里外都有BFC的

设立BFC (establish BFC，也就是说为其中的内容创建了**新的**Block Formatting Context，以容纳不同于“主页面”的normal flow)。
- floats （box里面按照normal flow来排布？）
- absolutely positioned elements
- block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, 
  - flex items
  - grid cell
  - ...
- and block boxes with 'overflow' other than 'visible'.

BFC合并发生之后会产生什么影响
- block box && overflow: visible
  - BFC合并与float
  - BFC合并与margin collapse

附：[Block formatting contexts](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)定义：
```
Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.

In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).

For information about page breaks in paged media, please consult the section on allowed page breaks.
```

[Inline formatting contexts](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)定义：
```
In an inline formatting context, boxes are laid out horizontally, one after the other, beginning at the top of a containing block. Horizontal margins, borders, and padding are respected between these boxes. The boxes may be aligned vertically in different ways: their bottoms or tops may be aligned, or the baselines of text within them may be aligned. The rectangular area that contains the boxes that form a line is called a line box.

The width of a line box is determined by a containing block and the presence of floats. The height of a line box is determined by the rules given in the section on line height calculations.

A line box is always tall enough for all of the boxes it contains. However, it may be taller than the tallest box it contains (if, for example, boxes are aligned so that baselines line up). When the height of a box B is less than the height of the line box containing it, the vertical alignment of B within the line box is determined by the 'vertical-align' property. When several inline-level boxes cannot fit horizontally within a single line box, they are distributed among two or more vertically-stacked line boxes. Thus, a paragraph is a vertical stack of line boxes. Line boxes are stacked with no vertical separation (except as specified elsewhere) and they never overlap.

In general, the left edge of a line box touches the left edge of its containing block and the right edge touches the right edge of its containing block. However, floating boxes may come between the containing block edge and the line box edge. Thus, although line boxes in the same inline formatting context generally have the same width (that of the containing block), they may vary in width if available horizontal space is reduced due to floats. Line boxes in the same inline formatting context generally vary in height (e.g., one line might contain a tall image while the others contain only text).
```

[inline, Inline-block, block之间的区别](https://www.w3schools.com/css/css_inline-block.asp)
```
Compared to display: inline, the major difference is that display: inline-block allows to set a width and height on the element.
Also, with display: inline-block, the top and bottom margins/paddings are respected, but with display: inline they are not.
Compared to display: block, the major difference is that display: inline-block does not add a line-break after the element, so the element can sit next to other elements.
```
也就是说inline可以无视定义在其中的width, height, margin, padding，如下图所示：
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/inline,inline-block,block.png?raw=true)

[overflow的定义](https://www.w3schools.com/css/css_overflow.asp)如下，可以限定block大小，引入滚动条以显示容纳不下的内容。
```
The CSS overflow property controls what happens to content that is too big to fit into an area.
```

### 6. CSS排版：Flex排版
### 7. CSS动画与绘制：动画
CSS控制表现
- 控制元素的位置，尺寸信息
- 控制绘制、渲染的信息
- 控制交互与动画的信息

Animation
- 使用keyframes定义动画关键帧
- 使用animation属性去使用关键帧
- 一个例子（见代码[animation.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/animation.html)）：
```
@keyframes mykf{
  from {background: red;}
  to {background: yellow;}
}

div {
  animation: mykf 5s infinite;
}
```

- Animation的六个属性：
  - animation-name 动画的名称
  - animation-duration 动画的时长
  - animation-timing-function 动画的时间曲线
  - animation-delay 动画开始前的延迟
  - animation-iteration-count 动画的播放次数
  - animation-direction 动画的方向

- Animation的另一个例子，可以分段定义每一帧的timing-function
```
@keyframes mykf{
  0% {top: 0; transition: top ease;}
  50% {top: 0; transition: top ease-in;}
  75% {top: 0; transition: top ease-out;}
  100% {top: 0; transition: top linear;}
}
```
- Transition 的四个属性：
  - transition-property 要变换的属性
  - transition-duration 变换的时长
  - transition-timing-function 时间曲线，三次贝塞尔曲线([cubic-bezier](https://cubic-bezier.com/#.3,.4,.5,1.6))
    - 内置的三次贝塞尔曲线：ease（最自然的变化），linear，ease-in（常常用于退出动画，例如有元素要退出屏幕），ease-out（屏幕外的东西从远处飞来的感觉，元素出现的动画）
  - transition-delay 延迟


### 8. CSS动画与绘制：颜色
- 红绿蓝RGB三原色进行色彩合成的原理由视锥细胞所决定。
- CMY三原色——品红(magenta)、黄(yellow)、青(cyan)——是红、绿、蓝三原色的补色，颜料的作用原理是吸收光，反射剩余部分，因此印刷行业中使用CMY补色。
- CMYK中的K是黑色(black)，因成本问题，黑色避免使用C, M, Y三色去调。
- HSL: 色相Hue（六种基本颜色拼成了一个色盘）, 纯度Saturation, 亮度Lightness。其中Lightness到0的是黑色，到100的时候是白色。
  - W3C体系推荐使用
- HSV: Hue, Saturation, 色值Value（Brightness）
  - 可以和HSL互转

HSL的一个具体动画例子如代码[hsl_animation.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/hsl_animation.html)，非动画的版本如代码[hsl.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/hsl.html)，效果如下：
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/hsl.png?raw=true)

### 9. CSS动画与绘制：绘制
绘制
- 几何图形
  - border（不推荐使用border去绘制五角星等几何图形，如果真的要去实现几何图形，需要使用svg）
  - box-shadow
  - border-radius
- 文字（矢量图）
  - font
  - text-decoration
- 位图
  - background-image

真正绘制时需要依赖底层图形库，如在手机上依赖skia，windows上依赖GDI，更底层的是使用Shader去绘制。

绘制几何图形的推荐方法：data uri + svg，例如要绘制椭圆可以在浏览器的地址栏中输入如下信息，或者使用代码[svg.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/svg.html)
```
data:image/svg+xml,<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80" style="fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2"/> </svg>
```
svg中支持path，因此可以绘制任意图形。


## 作业：对css属性进行分类
要求：最好是分到layout和render的下一层。

参见[css\_properties\_mindmap.pdf](https://github.com/waleking/Frontend-03-Template/blob/master/week06/css_properties_mindmap.pdf)。

### 遗留问题
BFC合并还不清楚。