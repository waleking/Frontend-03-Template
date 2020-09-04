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
正常流的两个非常复杂的机制：`float`和`clear`。
- `float`已经脱离了正常流，但是它依赖于正常流而定义。float元素排布时影响其高度占据范围内的所有行盒。超出float元素高度范围的不再考虑。如果有两个float元素，那么下一个float元素能浮动的位置受上一个float元素影响（不会占据上一个float元素的位置）。这样会产生两个float元素在视觉上相互挤靠堆叠的现象（不是一个盖住另一个，而是一个挤在另一个边上).
如代码[float.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float.html)所显示的那样：
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float.png?raw=true)
- `clear`用于解决上面两个float相互挤靠堆叠的问题，clear元素的语义不是清除float的意思，而是找一个干净的空间，然后进行浮动（a.k.a., 移动）。具体的，`clear:right`意思是找到右边一块干净的空间然后执行float操作。如代码[float_clear.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float_clear.html)，新的排布更干净整齐。`clear`最终表现出来是在纵向上寻找干净的位置，也就是说会改变原来排布中整体的纵向的高度。![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float_clear.png?raw=true)
- `float`和`clear`的一种早期用法：模拟flex box（尽管当时没有flex排布，但是已经有了类似于flex排布的需求）。在真正的排布中很少遇到图文混排的情况，基本上都是对`<div>`进行排布，而div是块级排布，会占据新的一行。因此用float来脱离正常流，然后重排，利用多个float会相互挤靠堆叠的效果，可以排进同一行。此外，使用`clear`来强制换行。如代码[float2.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float2.html)显示的如下效果：![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float2.png?raw=true)
- `float`导致的重排的现象，特别是`float:left`。代码[float3.html](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float3.html)显示如下![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week06/float3.png?raw=true)。

### 5. CSS排版：BFC合并
### 6. CSS排版：Flex排版
### 7. CSS动画与绘制：动画
### 8. CSS动画与绘制：颜色
### 9. CSS动画与绘制：绘制
