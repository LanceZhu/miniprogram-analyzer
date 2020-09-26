# plato mini program

## 代码质量衡量指标说明

### 综述

[传送门](https://radon.readthedocs.io/en/latest/intro.html)

### plato 生成页面指标说明

#### 总 Summary

1. Total Lines
   总代码行数，表示文件中的代码总行数。
2. Average Lines
   平均代码行数
3. Maintainability
   代码可维护性指标，[参考说明](https://avandeursen.com/2014/08/29/think-twice-before-using-the-maintainability-index/)
   Maintainability Index = MAX(0,(171 - 5.2 * log(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * log(Lines of Code))*100 /171)
   可维护性指标为0-100之间的数字，数值越大表示越易于维护。
   20-100：易于维护
   10-19：较难维护
   0-9：很难维护 
4. Average Maintainability
   平均代码可维护性，依据各文件取平均得出
5. Lines of code
   各文件代码行数
6. Estimated errors in implementation
   潜在bug数估计，依据[Halstead](https://en.wikipedia.org/wiki/Halstead_complexity_measures)模型得出
7. Lint errors
   jsLint错误数，不符合约定编程风格错误数

#### 各文件衡量指标

1. Difficulty
   文件中去重操作数越难；重复操作符越多，越难。依据[Halstead](https://en.wikipedia.org/wiki/Halstead_complexity_measures)模型得出
2. Complexity
   圈复杂度，表示代码块中所有可能的路径数。圈复杂度越低越好。
   降低圈复杂度的方法：减少分支数。[圈复杂度说明](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
3. Function weight
   函数权重。有如下几种分类方式：
   By Complexity：按圈复杂度统计
   BySLOC：按照SLOC/LSLOC（源代码行/逻辑代码行）统计。
   SLOC：物理代码行，统计物理行数，包括注释、空行等。
   LSLOC：逻辑代码行，统计语句数。

## 使用

### 项目启动

```bash
$ git clone https://github.com/LanceZhu/plato-mini-program-zh-CN.git
$ cd plato-mini-program-zh-CN
$ npm install
```

### 代码分析

#### 使用帮助

```bash
$ node bin/index.js analyze -h # 查看使用帮助
```

#### 示例

```bash
$ node bin/index.js analyze example/seed
报告输出至：plato-mini-program-zh-CN/report/seed
```

分析报告:

```md
report/seed
├── plato       # 分析报告 HTML
└── report.json # 详细信息
```

## 问题
- 代码片段中存在中文字符， plato 不能正常执行