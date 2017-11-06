### 2017-11-02 ###
gogokoala:
1.测试修正sf1 api的若干问题
2.sf1 简单检索编码
3.sf1 高级检索增加日期选择组件，引入primeng库( https://www.primefaces.org/primeng/#/calendar )

puyd:
1.创建complex-search.service.ts
2.初步实现关键字条件选择和添加

### 2017-11-03 ###
puyd:
1.实现关键字段查询

### 2017-11-04 ###

### 2017-11-05 ###
puyd:
1.各查询字段的第一条记录指定的操作符，专用于指定整个查询字段与其他字段的组合方式（以前固定为AND组合，现在可以使用OR）
2.实现日期范围查询条件
3.移动complex-search.service.ts到sf1目录下，重命名为sf1-search.service.ts

todo:
1.日期输入框的宽度，在不同的模式下，需要进行调整。

### 2017-11-06 ###
puyd:
1.ComplexSearch查询条件全局存储
2.实现buildKeySearch和buildCodeSearch
3.实现getKeyWords
