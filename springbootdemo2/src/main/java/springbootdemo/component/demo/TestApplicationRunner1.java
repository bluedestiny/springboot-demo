package springbootdemo.component.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
@Component
@Order(2)
public class TestApplicationRunner1 implements ApplicationRunner{
	private Logger log = LoggerFactory.getLogger(this.getClass());
	@Override
	public void run(ApplicationArguments args) throws Exception {
		log.info("测试applicationrunner接口1");
	}

}
