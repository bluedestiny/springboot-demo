package springbootdemo.component.websocket;


import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 *
 * Title:WebSocketMessage
 * Description:前台进行websocket连接的请求地址
 * Company:ultrapower
 * author:wang_ll
 * date  :2016年9月8日
 */
@ServerEndpoint(value = "/ws/message")
@Component
public class WebSocketMessage {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketMessage.class);

    @OnMessage
    public void onMessage(String message, Session session) throws IOException,
            InterruptedException {
            // 注册操作
            WebSocketManager.getInstance().addSession("index", session);
            logger.debug("===> websocket connect register:" + "index");
        
    }

    @OnOpen
    public void onOpen() {
        logger.debug("===> 已打开连接。");
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        logger.debug("===> 已关闭连接。");
        WebSocketManager.getInstance().removeSession((String) session.getId());
    }

    @OnError
    public void onError(Throwable e, Session session) throws IOException {
        //由于客户端浏览器关闭，就会进入该异常，是正常异常，不需要日志
        logger.debug("===> 客户端浏览器关闭，WebSocket写入失败.");
        WebSocketManager.getInstance().removeSession((String) session.getId());
    }

}