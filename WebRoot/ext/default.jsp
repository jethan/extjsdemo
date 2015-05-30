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
		<base href="<%=basePath%>">
		<title>Basic CRUD Application - Extjs CRUD DEMO</title>
        <jsp:include page="inc.jsp"></jsp:include>
        <script type="text/javascript" src="ext/js/default.js">
        </script>
	</head>
	
  <body>
  </body>
  
</html>
