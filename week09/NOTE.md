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