bean的控制反转和依赖注入，可以通过xml或注解实现。
用xml时
```
需要在applicationContext.xml中:
<!-- src/main/resources/applicationContext.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 定义依赖类 -->
    <bean id="dependencyBean" class="com.example.DependencyBean">
        <property name="data" value="Dependency Data"/>
    </bean>

    <!-- 手动定义 ExampleBean 的 bean -->
    <bean id="exampleBeanProperty" class="com.example.ExampleBean">
        <property name="dependency" ref="dependencyBean"/>
    </bean>

    <bean id="exampleBeanConstructor" class="com.example.ExampleBean">
        <constructor-arg ref="dependencyBean"/>
    </bean>
</beans>
通过标签实现控制反转和依赖注入(属性注入，构造注入)
```

用注解时
```
需要在applicationContext.xml中:
设置<context:component-scan base-package="com.example"/>扫描包范围即可
可以使用注解实现控制反转和依赖注入(属性注入，构造注入)
```