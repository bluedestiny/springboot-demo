package springbootdemo.component.websocket;

import javax.websocket.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author Angel
 * @date 5/29/2018
 */
public class WebSocketManager {

//    private static Logger logger = Logger.getLogger(WebSocketManager.class);

    /**
     * 存储操作主页面mainFrame.jsp页面所有客户端的连接
     */
    private Map<String, Session> sessions = null;


    /**
     * 系统消息处理类
     */
    static Map<String, String> handlers = null;

    static final String KEY_ID = "id";
    static final String KEY_OPT = "opt";

    private WebSocketManager() {
        // 不可实例化
        sessions = new HashMap<String, Session>();

    }

    private static WebSocketManager manager = null;

    private static synchronized void init() {
        if (manager == null) {
            manager = new WebSocketManager();
        }
    }
    public static WebSocketManager getInstance() {
        if (manager == null) {
            init();
        }
        return manager;

    }
    /**
     * 登录系统时，注册主页面连接
     * @param key
     * @param session
     */
    public synchronized void addSession(String key, Session session) {
        sessions.put(key, session);
    }

    /**
     * 退出系统时，移除连接
     * @param key
     * @throws IOException
     */
    public synchronized void removeSession(String key) throws IOException {
        Session session = sessions.remove(key);
        if (session != null && session.isOpen()) {
            session.close();
        }
    }


    public synchronized boolean isExist(String key) {
        return sessions.containsKey(key);
    }


    /**
     * 发送消息
     * @param key
     * @param message
     * @throws IOException
     */
    public void sendMessage(String key, String message) throws IOException {
        Session session = sessions.get(key);
        if (session != null && session.isOpen()) {
            session.getBasicRemote().sendText(message);
        }
    }

    /**
     * 发送消息
     * @param session
     * @param message
     * @throws IOException
     */
    public void sendMessage(Session session, String message) throws IOException {
        if (session != null && session.isOpen()) {
            session.getBasicRemote().sendText(message);
        }
    }

    /**
     * 外界定时任务调用：给所有注册的websocket发送消息
     * @return
     */
    public Map<String, Session> getSessions() {
        clearClosedSession();
        return sessions;
    }


    /**
     * 清理已经关闭的连接：在系统告警时时发送信息之前先清理，只有WarningJob调用
     */
    public synchronized void clearClosedSession(){
        Set<String> closedSessionIds = new HashSet<String>(16);

        for(Map.Entry<String,Session> entry:sessions.entrySet()){
            if(entry.getValue().isOpen()){
                continue;
            }

            //已关闭状态，则记录
            closedSessionIds.add(entry.getKey());
        }

        //遍历移除首页的
        for(String closeeSessinId:closedSessionIds){
            try {
                WebSocketManager.getInstance().removeSession(closeeSessinId);
            } catch (IOException e) {
            }
        }

    }

}
