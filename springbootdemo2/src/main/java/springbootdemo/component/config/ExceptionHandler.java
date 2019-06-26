package springbootdemo.component.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	@org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
	public void handlerException() {
		log.info("异常统一处理");
	}
}
