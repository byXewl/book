**导入驱动**
可以导入mysql或者postgres驱动等
maven导包:
```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.27</version>
</dependency>
```

手动导包：
1.驱动jar包放入lib/加入库
2.注册驱动：class.forName("com.mysql.jdbc.Driver");
Driver类自动注册在DriverManger对象中

**获取链接对象**
String url = "jdbc:mysql://localhost:3306/mydb"; 
String username = "root";
String password = "password";
Connection conn = DriverManger.getConnection(url,username,password)

**获取执行Sql对象**
Statement stmt = conn.createStatement();

**执行Sql**
int r = stmt.excuteUpdate(sql);//DML DDL
ResultSet re = stmt.executeQuery(sql);//DQL

**关闭连接资源**
```
 } finally {     
        try {
            if (re != null) {
                re.close();//关闭结果集对象
            }
            if (stmt != null) {
                stmt.close();//关闭执行sql对象
            }
            if (conn != null) {
                conn.close();//关闭数据库连对象
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
 }
```
## **完整示例**
```
// 1. 定义数据库连接信息
String jdbcUrl = "jdbc:mysql://localhost:33066/mydb?serverTimezone=UTC";
String user = "root";
String password = "123456";

Connection connection = null;
Statement statement = null;
ResultSet resultSet = null;

try {
    // 2. 加载数据库驱动
    Class.forName("com.mysql.cj.jdbc.Driver");

    // 3. 建立数据库连接
    connection = DriverManager.getConnection(jdbcUrl, user, password);

    // 4. 创建Statement对象，用于执行SQL查询
    statement = connection.createStatement();

    // 5. 执行SQL查询
    String sql = "SELECT * FROM test_table";
    resultSet = statement.executeQuery(sql);

    // 6. 处理查询结果
    List<TestTable> list = new ArrayList<>();
    while (resultSet.next()) {
        TestTable testTable = new TestTable();

        int id = resultSet.getInt("id");
        String name = resultSet.getString("name");
        int age = resultSet.getInt("age");

        testTable.setId(id);
        testTable.setName(name);
        testTable.setAge(age);

        list.add(testTable);
    }
    System.out.println(list);
} catch (ClassNotFoundException e) {
    e.printStackTrace();
} catch (SQLException e) {
    e.printStackTrace();
} finally {
    // 7. 关闭资源
    try {
        if (resultSet != null) {
            resultSet.close();
        }
        if (statement != null) {
            statement.close();
        }
        if (connection != null) {
            connection.close();
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
}
```





