# 学习笔记
## 1. 使用LL算法构建AST | 四则运算
四则运算词法定义（不包含括号）
- TokenNumber
  - 0, 1, 2, ..., 9的组合
- Operator
  - +, -, *, / 之一
- White space
  - \<SP\>
- LineTerminator
  - \<LF\> \<CR\>

四则运算语法定义（不包含括号，因此不会改变运算优先级，最先计算的是MultiplicativeExpression，并且MultiplicativeExpression中不包含AdditiveExpression）：
```
<Expression>::=<AdditiveExpression><EOF>
```

```
<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
```

```
<MultiplicativeExpression>::=
    <Number>
    | <MultiplicativeExpression>*<Number>
    | <MultiplicativeExpression>/<Number>
```

## 2. 使用LL算法构建AST | 正则表达式
正则表达式的exec(source)可以不断扫描原字符串中的内容。如果匹配到了source中的某个位置，进一步判断该位置匹配到了正则表达式中的哪一个group，然后根据group输出该token的类别（Number, Whitespace, LineTerminator, *, /, +, -)。代码可见[1-正则表达式.html](1-正则表达式.html)，其运行结果可见[1-正则表达式.log](1-正则表达式.log)。
## 3. 使用LL算法构建AST | LL词法分析
在[1-正则表达式.html](1-正则表达式.html)的基础上，编写了[2-词法分析.html](2-词法分析.html)，增加了两项内容：
1. 增加一个判断：如果匹配出来的长度和前进的长度不一致。使用regexp.lastIndex，每次用新生成的lastIndex和旧的lastIndex做比较，如果差值大于匹配出来的长度，那么就认为存在我们不认识的格式。TODO：此处最好有一个例子来说明?
2. 使用yield关键字，将函数变为generator。根据[定义](https://hackernoon.com/javascript-es6-you-dont-really-need-to-learn-generators-96aa2e9114fa)，And in a generator function, the yield keyword pauses function execution and returns (yields) a value.
留有一个疑问：为什么说这么处理能让我们的代码变成完全异步的形式？
## 4. 使用LL算法构建AST | LL语法分析 1
## 5. 使用LL算法构建AST | LL语法分析 2
按照产生式写递归函数，在递归过程中对source[]数组进行规约操作。其中，需要将单独的一个Number看做是特殊的乘法。

`10 + 25 * 5`最终解析为如下AST语法分析树的形式：
```
{
  "type": "Expression",
  "children": [
    {
      "type": "AdditiveExpression",
      "operator": "+",
      "children": [
        {
          "type": "AdditiveExpression",
          "children": [
            {
              "type": "MultiplicativeExpression",
              "children": [
                {
                  "type": "Number",
                  "value": "10"
                }
              ]
            }
          ]
        },
        {
          "type": "+",
          "value": "+"
        },
        {
          "type": "MultiplicativeExpression",
          "operator": "*",
          "children": [
            {
              "type": "MultiplicativeExpression",
              "children": [
                {
                  "type": "Number",
                  "value": "25"
                }
              ]
            },
            {
              "type": "*",
              "value": "*"
            },
            {
              "type": "Number",
              "value": "5"
            }
          ]
        }
      ]
    },
    {
      "type": "EOF"
    }
  ]
}
```

学习了词法分析和LL语法分析技术，很多复杂的产生式都能进行解析了。