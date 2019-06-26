package springbootdemo.component.schedule;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import springbootdemo.component.websocket.WebSocketUtil;

@Component
@EnableScheduling
public class MySchedule {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	@Scheduled(cron="0/5 * * * * ?")
	public void show() {
		log.info("定时任务执行！！！");
		log.info("进行推送");
		Map<String, String> data = new HashMap<>();
		data.put("time", "20190625");
		data.put("content", "hello client!");
		
		WebSocketUtil.sendMessage(data);
	}
}
