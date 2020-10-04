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
## 4. 使用LL算法构建AST | LL语法分析 1
## 5. 使用LL算法构建AST | LL语法分析 2