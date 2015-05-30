<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE>
<html>
  <head>
    <title>员工管理登录</title>
    <base href="<%=basePath%>" />
    <jsp:include page="inc.jsp"></jsp:include>
    <script language="JavaScript">   
    if (window != top)   
    top.location.href = location.href;   
    </script>
    <style>
		#login {
		  position:absolute; 
		  left:50%; 
		  top:50%; 
		  margin:-100px 0 0 -150px; 
		}
	</style>
  </head>
  
  <body>
    <center>
		<div id="login"></div>
	</center>
  </body>
  <script type="text/javascript" src="ext/js/login.js"></script>
</html>