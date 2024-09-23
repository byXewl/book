## **JNDI+RMI利用方式**
直接JNDI运行远程方法。
在JNDI服务中，RMI服务端除了直接绑定远程对象之外，还可以通过References类来绑定一个外部的远程对象(当前名称目录系统之外的对象)。绑定了Reference之后，服务端会先通过Referenceable.getReference()获取绑定对象的引l用，并且在目录中保存。
当客户端在lookup()查找这个远程对象时，客户端会获又相应的object factory，最终通过factory类将reference转换为具体的对象实例。
在jdk 8U121后不可用了。