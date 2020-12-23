# 学习笔记
## proxy的基本用法
如果我们希望一个对象既可以被设置，也可以被监听，那么我们可以用proxy对object做一层包裹。
通过[Proxy的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)可以查看有多少钩子函数我们可以使用，例如[set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)，[get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)，[has](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)。
因为proxy会改变原有object的一些行为，因此非常强大，但同时降低了代码的可预期性，只有在底层代码库中能合理地使用这一技术。

代码见[proxy_basic_usage.html](proxy_basic_usage.html)。

