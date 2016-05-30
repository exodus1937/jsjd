<%@ page contentType="text/html;charset=gb2312"%>
<%@ page language="java" import="java.io.*,java.net.*" pageEncoding="gb2312"%>
<html>
<head> 
<title>download</title>

</head> 
<body>
<% 
response.setContentType("text/html");
javax.servlet.ServletOutputStream ou = response.getOutputStream();
String filepath="D:/document/";
String filename=new String(request.getParameter("filename").getBytes("ISO8859_1"),"UTF-8");
System.out.println("DownloadFile filepath:" + filepath);
System.out.println("DownloadFile filename:" + filename);
java.io.File file = new java.io.File(filepath + filename);
if (!file.exists()) {
System.out.println(file.getAbsolutePath() + " 文件不存在!");
return;
}

java.io.FileInputStream fileInputStream = new java.io.FileInputStream(file  );
if (filename != null && filename.length() > 0) {
response.setContentType("application/x-msdownload");
response.setHeader("Content-Disposition", "attachment; filename=" + new String(filename.getBytes("UTF-8"),"iso8859-1"));
if (fileInputStream != null) {
byte a[] = new byte[1024];
int n =0;
while((n = fileInputStream.read(a)) != -1) {
                
   ou.write(a, 0, n);
          
} 
}
fileInputStream.close();
ou.close();
}
out.clear();  
out = pageContext.pushBody(); 
%> 
</body>
</html>