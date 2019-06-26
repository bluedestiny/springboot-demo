/**
 * html5的websocket消息
 */
function WebSocketMessage() {
	if(window.location.host.indexOf("https:")==0){
		this.url = "wss://"+window.location.host+ PATH + "/ws/message";
	}else{
		console.log("http request and use ws.");
		this.url = "ws://"+window.location.host+ PATH + "/ws/message";
	}
	this.onError = function(event){};
	this.onMessage = function(event){};
}

/**
 * 开启websocket连接：登录系统时执行该操作
 */
WebSocketMessage.prototype.connect = function() {
	/*if(msgType==undefined){
		msgType= 'register';
	}*/
	this.webSocket = new WebSocket(this.url);
	this.webSocket.onopen = function(event) {
		console.log("打开socket连接");
		this.send("hello server!!!");
	};
	
	this.webSocket.onerror = this.onError;
	this.webSocket.onmessage = this.onMessage;
}

/**
 * 断开websocket消息连接：退出系统时执行该操作
 */
WebSocketMessage.prototype.disconnect = function() {
	this.webSocket.close();
}

WebSocketMessage.prototype.sendMessage = function(opt, param) {
	this.webSocket.send("{\"opt\":\"" + opt
			+ "\", \"data\":\"" + param + "\"}");
};