package springbootdemo.component.aop;


import org.aopalliance.intercept.Joinpoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AopConfig {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Pointcut("execution(public * springbootdemo.controller.*.*(..))")
	public void cut() {
		System.out.println("--------------");
	}
	@Before("cut()")
	public void before() {
		
		logger.info("--------------before------------------");

	}
	
	@After("cut()")
	public void after() {
		logger.info("--------------after--------------------");
	}
}
