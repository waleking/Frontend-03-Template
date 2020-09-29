# 学习笔记

## 实现一个地图编辑器
功能点：
1. 100*100的格点
2. 能够绘制地图
3. 能够保存绘制好的地图

window.loadStorage作为一个object，可以用来保存浏览器中的数据，并且能够跨browser sessions. 
相比于sessionStorage，没有expiration time. 参考[Window.localStorage
](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

mousemove事件: The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it (参考[Element: mousemove event](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)).

mousedown事件，event.which=3表示右键，1表示左键。

mousedown右键的时候要禁止默认的事件响应。
```javascript
    document.addEventListener("contextmenu", (e)=>{ // 防止弹出菜单
        e.preventDefault();
    })
```

代码见[地图编辑器](1-地图编辑器.html)。

## 广度优先搜索
JavaScript中的数组是天然的队列和栈，有两组方法：shift（弹出第一个元素）, unshift（插到数组的开头），push，pop。
当使用栈的时候使用push和pop。
当使用队列的时候：使用push和shift；或者unshift和pop。

代码见[2-广度优先搜索.html](2-广度优先搜索.html)。

## 可视化
代码见[3-可视化.html](3-可视化.html)。

## 路径
通过使用table，设置前驱节点来输出路径。代码见[4-路径.html](4-路径.html)。

## 启发式思路
何为启发式：在扩展点时，判断各个点的优先级，这样寻路就有了方向。
能够找到最优路径的启发式寻路方式是A*算法，如果启发式方法不是最优的，那么就是A算法。

在广度优先搜索的基础上修改A*算法，逻辑主体不用动，只需要修改queue为一个新的数据结构，使得这个数据结构能够以不同的优先级来选点。
在本节中使用Sorted这个自定义的数据结构，该数据结构直接使用无序数组来保存，取数据的时候取最小的那个元素，pop out这个最小元素的操作是O(1)的。
一种更好的方式是使用heap。但是这一节里为了演示A*算法，采用了较为简单的实现方式。