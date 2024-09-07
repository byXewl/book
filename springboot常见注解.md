## **启动器**
```
@SpringBootApplication
包含启动和控制反转声明扫描器ComponentScan
扫描启动器类所在的包和子包下。

只要控制反转声明能被扫描
@Autowired()和@Resource() 可在不同目录依赖注入
```
^
## **控制反转与依赖注入**
```
声明此类被控制反转:
@Component()
不同层对@Component的衍生注解
dao层：@Repository /@Mapper
service层：@Service
controller：@Controller/@RestController

依赖注入：
需要实例的属性声明上方加注解(属性注入)
自动按类型注入@Autowired()
按名注入@Resource(name="类名")
```
^
## **controller层**
```
类上@RestController = @Controller声明控制反转 + @ResponseBody 响应成json

方法上@ResquestMapping 指明url

等
```
^
## **service层**
```
@Service声明控制反转
```

^
## **dao/mapper层**
```
@Mapper声明控制反转 


@Select执行select的sql语句等
```

^
## **自带测试**
```
@SpringBootTest类下，方法可做单元测试


@Autowired/@Resource 可依赖注册
```