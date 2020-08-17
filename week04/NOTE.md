# 学习笔记

## 课程记录
### 根据浏览器属性进行排版
ToyBrowser以flex排版为例。

css有三代排版技术：
1. 正常流，包含position，display，float等属性，是古典排版策略。
2. flex，接近人的正常思维，“填满剩余空间”等概念。 
3. grid，更强大。
4. Houdini? box? 

flex排版有主轴(main axis)的概念，即排版时主要的延伸方向。和主轴相垂直的是交叉轴方向(cross axis)。
1. flex-direction: row
   
   主轴上的属性: width x left right

   交叉轴上的属性: height y top bottom

2. flex-direction: column
   
   主轴上的属性: height y top bottom

   交叉轴上的属性: width x left right

抽象出主轴和交叉轴之后，就不用写超多的if else进行区分了。

代码中添加了layout函数，需要判断layout在什么时候发生。flex布局中需要知道子元素。


### 收集元素进行(hang)
根据主轴尺寸，把元素分进行（line）。若设置了no-wrap属性，则强行分配进第一行。

若所有子元素(flex item)的尺寸的和超过主轴尺寸的时候，会进行分行。

### 计算主轴
计算主轴方向
1. 找出所有Flex元素
2. 把主轴方向的剩余尺寸按比例分配给Flex元素；no-wrap模式下，若剩余空间为负数，则所有Flex元素为0，等比例压缩剩余元素。

没有flex的情况的话，用justifyContent?

### 计算交叉轴
1. 根据每一行中最大元素尺寸计算行高。
2. 根据行高flex-align，item-align，确定元素的位置

flex-align? item-align?

### 绘制单个元素

### 绘制DOM树
* 递归调用子元素的绘制方法完成DOM树的绘制。
* 实际浏览器中，文字绘制是难点，需要依赖字体库，ToyBrowser忽略它。
* 实际浏览器中，需要对一些图层做compositing，我们这里也忽略它。

没有做文字渲染，没有做边框，没有做layout offset的逻辑。


## 作业记录
### 根据浏览器属性进行排版
The justify-content property accepts different values:

1. flex-start (default): items are packed toward the start line
2. flex-end: items are packed toward to end line
3. center: items are centered along the line
4. space-between: items are evenly distributed in the line; first item is on the start line, last item on the end line
5. space-around: items are evenly distributed in the line with equal space around them
6. space-evenly: items are distributed so that the spacing between any two adjacent alignment subjects, before the first alignment subject, and after the last alignment subject is the same
