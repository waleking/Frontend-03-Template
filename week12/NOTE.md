# 学习笔记
## proxy的基本用法
如果我们希望一个对象既可以被设置，也可以被监听，那么我们可以用proxy对object做一层包裹。
通过[Proxy的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)可以查看有多少钩子函数我们可以使用，例如[set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)，[get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)，[has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)。
因为proxy会改变原有object的一些行为，因此非常强大，但同时降低了代码的可预期性，只有在底层代码库中能合理地使用这一技术。

代码见[proxy_basic_usage.html](proxy_basic_usage.html)。

## 模仿reactive实现原理1
proxy设置get和set，可以访问和改变被代理的object。
代码见[reactive1.html](reactive1.html)。

## 模仿reactive实现原理2
增加一个effect函数，其中effect函数的参数是一个callback函数。
设置了一个全局的callbacks数组，在effect函数中将callback添加到callbacks数组中。
代码见[reactive2.html](reactive2.html)。
但是这里，为什么要用effect函数，这是一个问题！
TODO：effect的作用是什么？
