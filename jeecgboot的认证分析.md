
数据库password存储的，用明文密码 加密 用户名 后的密文，这个不可以解密只能碰撞。
import org.jeecg.common.util.PasswordUtil;
貌似有些字段也是这样用加密的。


jwt的密钥是每一个用户的数据库中password，但是貌似有redis白名单，即使伪造了jwt也不能直接携带请求。

^
有一个AES加密import org.jeecg.common.util.encryption.AesEncryptUtil;
加密密钥和IV一般为默认值硬编码的。
