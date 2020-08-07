# 学习笔记

## 本周学习
1，学习有限状态机如何编写，充分体会到函数是一等公民。

2，Browser经历五个步骤

URL  =>   HTML => DOM      =>       DOM with css => DOM with position => Bitmap
    http      parse   css_computing           layout                render

3. TCP与IP的一些基础知识
libnet 负责构造IP包并发送，libpcap负责抓所有流经网卡的IP包。


## 作业心得
### server.js 排错
`server.js`中刚开始出现如下错误，也就是说Buffer.concat(body)尝试将body拼接起来，但是发现body是string而非Buffer or Uint8Array.

```
buffer.js:569
      throw new ERR_INVALID_ARG_TYPE(
      ^

TypeError [ERR_INVALID_ARG_TYPE]: The "list[0]" argument must be an instance of Buffer or Uint8Array. Received type string ('{"query": "empty"}')
```

在讨论区中受`阿冰777`的提示，改为了body.push(chunk); 解决了问题。
通过console.log(chunk.constructor.name)发现这里chunk的类型是Buffer，不需要toString，以方便后面的Buffer.conncat(body)使用。

### server.js 测试
具体的，使用如下脚本测试server.js
```
node server.js
curl -H "Content-Type:application/json" -X POST -d '{"query": "empty"}' http://127.0.0.1:8088/
```

运行结果如下：
```
server started
headers:
{
  host: '127.0.0.1:8088',
  'user-agent': 'curl/7.65.3',
  accept: '*/*',
  'content-type': 'application/json',
  'content-length': '18'
}

method:
'POST'
chunk is a kind of Buffer
Before concat() and toString(), body:
[
  Buffer(18) [Uint8Array] [
    123,  34, 113, 117, 101, 114,
    121,  34,  58,  32,  34, 101,
    109, 112, 116, 121,  34, 125
  ]
]
body:  {"query": "empty"}
```

对结果的解释如下：
1. body包含一个Buffer，长度为18，对应于{"query": "empty"}的ASCII码。例如{的ASCII码是123。这和winter老师在String一节中的讲解一样，ASCII码在UTF8中只用一个字节表示，表示方式和ASCII的相同。

2. http.createServer中的request负责解析http请求；response部分负责处理http响应。
[node.js中http部分文档](https://nodejs.org/es/docs/guides/anatomy-of-an-http-transaction/)给出了具体的解释。
要获知request中的其他部分，可以使用console.dir(request)查看。

3. http.createServer()中debugger为什么不发挥作用？

