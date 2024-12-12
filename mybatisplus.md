使用mybatisplus，安装mybatisplus插件后，通过右上角[其他]，可以链接数据库后，选择表自动创建的模型domain实体类。
实体类的主键id类型，有自增，雪花，uuid
![](.topwrite/assets/image_1733986925638.png)

^
## **mapper层**
有个父类BaseMapper，里面实现了基础增删改查。


XxMapper继承 `BaseMapper`时。
当你的XxServiceImpl类继承 `ServiceImpl` 类并提供这两个泛型参数时<XxMapper, Xx>，MyBatis-Plus 会自动为你提供一些标准的 CRUD 操作实现，这些操作可以直接通过 `XxServiceImpl` 类来调用。

^
## **分页方法**
在服务层可以用
PageHelper插件来分页。(自己拼接的联合sql时推荐)
也可以
MyBatisPlus带有的baseMapper.selectPage

通过低层拦截器，修改查询sql语句，如加limit。