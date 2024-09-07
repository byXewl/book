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
