# 学习笔记
## 1. 实现一个TicTacToe游戏
实现TicTacToe的同时复习了css的知识，DOM API的知识。
## 2. 实现一个带AI的TicTacToe游戏

[tictactoe_ai2.html](https://github.com/waleking/Frontend-03-Template/blob/master/week08/tictactoe_ai2.html)代码的效果如下：
![alt text](https://github.com/waleking/Frontend-03-Template/blob/master/week08/tic_tac_toe_ai.gif?raw=true)

## 3. async异步编程
JavaScript中没有同步的等待时间的机制。JavaScript的异步机制有三种：
- callback
- Promise，来源于Promise/A+跨语言的异步机制
- async/await，对Promise机制的语法封装，在运行时也是靠Promise。

如果只使用callback，那么嵌套层级增多，可能会导致回调地狱callback-hell。
如代码[redgreeen_callback.html](https://github.com/waleking/Frontend-03-Template/blob/master/week08/redgreen_callback.html)
```javascript
   function go(){
        green();
        setTimeout(function(){
            yellow();
            setTimeout(function(){
                red();
                setTimeout(function(){
                    go();
                }, 5000);
            }, 2000);
        }, 10000);
    }
    go();
```

使用Promise的版本。
如代码[redgreeen_promise.html](https://github.com/waleking/Frontend-03-Template/blob/master/week08/redgreen_promise.html)。
```javascript
    // 使用promise来取代callback
    function sleep(t){
        return new Promise((resolve, reject)=>{
            setTimeout(resolve, t);
        });
    }

    // 使用了Promise，用链式表达式代替了回调式，比callback更友好
    function promiseGo(){
        green();
        sleep(1000).then(()=>{
            yellow();  
            return sleep(200);
        }).then(()=>{
            red();
            return sleep(500);
        }).then(promiseGo);
    }

    promiseGo();
```

async版本，使用了async和await，在语法层面上对promise进行了封装，使得代码的执行起来像是同步地等待时间。
**async, await使我们可以像使用同步代码那样去操作异步代码**。
如代码[redgreeen_async.html](https://github.com/waleking/Frontend-03-Template/blob/master/week08/redgreen_async.html)。
```javascript
    // 使用promise来取代callback
    function sleep(t){
        return new Promise((resolve, reject)=>{
            setTimeout(resolve, t);
        });
    }

    // 使用了async和await，在语法层面上对promise进行了封装，使得代码的执行起来像是同步地等待时间
    async function asyncGo() {
        while(true){
            green();
            await sleep(1000);
            yellow();
            await sleep(200);
            red();
            await sleep(500);
        }
    }

    asyncGo();
```

可以将自动控制的信号灯变为手动控制的信号灯。这是Promise加上async, await机制强大的地方：简洁性上优于callback方法。