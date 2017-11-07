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

steps:
1.完善api/sf1

### 2017-11-04 ###
steps:
1.sf1简单检索继续编码，增加sf1-list-resolver.service.ts

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
4.实现数据库选择getDBValue

steps:
1. sf1-list-resolver.service.ts编码
2. sf1-list 页面数据显示
3. 讨论检索结果及二次检索的实现方法

### 2017-11-07 ###
steps:
1. 格式化sf1-search.service
2. 修正footer显示错误
3. 各页面增加user: UserService
4. 测试已有代码(进行中)
5. TODO: 高级检索面页，各条件中首条件均未显示NOT
6. 修正server/redisstore.ts使用阿里云Redis

puyd:
1. 修改查询条件的生成逻辑，放开首字段不能为NOT的限制，但是受API限制，以NOT开头的查询条件不能被执行
2. 取消原有的不同条件组之间的AND连接，取消条件组的优先级括号，修改为每个条件均按其首个有效条件（不为空）的操作符串联