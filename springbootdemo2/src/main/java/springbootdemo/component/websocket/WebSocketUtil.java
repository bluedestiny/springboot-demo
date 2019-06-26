package springbootdemo.component.websocket;

import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.Session;
import java.io.IOException;
import java.util.Map;

/**
 *
 * Title:IndexWebSocketUtil
 * Description:首页WebSocket处理工具类，向服务器维护的Session推送Websocket数据
 * Company:ultrapower
 * @author:wang_ll
 * date  :2017年9月20日
 */
public class WebSocketUtil {

    private static Logger logger = LoggerFactory.getLogger(WebSocketUtil.class);

    /**
     * 遍历Session集合，向页面推送WebSocket数据
     * @param data
     */
    public static void sendMessage(Object data){
        if( data ==null){
            return ;
        }
        //定义WebSocket数据:转换为JSON字符串
        String realData = JSONObject.toJSONString(data);

        //遍历首页的Websocket Session,逐一发送
        Map<String,Session> sessions = WebSocketManager.getInstance().getSessions();
        for(Map.Entry<String,Session> entry:sessions.entrySet()){
            //发webSocket
            Session session = entry.getValue();
            try {
                WebSocketManager.getInstance().sendMessage(session,realData);
                logger.debug("===> " + entry.getKey()+"，向其发送消息成功."+realData);
            } catch (IOException e) {
                logger.error("发送websocket消息异常.",e);
            }
        }
    }
}
