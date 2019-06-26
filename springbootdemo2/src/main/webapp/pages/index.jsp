<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <h1>hello boot</h1>
    <script type="text/javascript">
        var PATH = "<%=path%>";
    </script>
    <script type="text/javascript" src="<%=path%>/script/websocket.js"></script>
    <script type="text/javascript">
    function initWebSocket(){
        //创建对象
        ws = new WebSocketMessage();
        
        ws.onError = function(data) {
            console.log(data);
            ws.disconnect();
        };
        
        //指定由消息推送时的回调
        ws.onMessage = function(data) {
            //这个data是页面推送的数据,data是一个MessageEvent对象
            //真正的数据传输过来是一个字符串，需要转换成json对象：莫名奇妙会话过期问题的根源是处理websocket响应不正确
            var realData = JSON.parse(data.data);
            handlerWebsocketMsg(realData);
        };
        
        //连接
        ws.connect();
    }

    /**
     * 处理后台推送的WebSocket请求
     * @param realData
     */
    function handlerWebsocketMsg(realData){
       alert(realData.time + ":" + realData.content);
    	    
    }
    initWebSocket();
    </script>
</body>
</html>