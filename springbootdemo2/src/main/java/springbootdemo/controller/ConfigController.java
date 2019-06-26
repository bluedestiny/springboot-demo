package springbootdemo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import springbootdemo.component.config.MyConfig;
import springbootdemo.service.Impl.ConfigService;

@RestController
/*@CrossOrigin(origins = "http://localhost:8080",methods = RequestMethod.POST,allowCredentials = "true")*/
public class ConfigController {
	@Autowired
	private ConfigService configService;
	@Autowired
	private MyConfig config;
	
	
	@RequestMapping("config")
	public Object testConfig() {
		
		return config.getItem2();
		
	}
	
	@RequestMapping("exception")
	public void testException() throws Exception {
		throw new Exception();
	}
	
	@RequestMapping("test")
	public String test() {
		return "hello world";
	}
	
	
	@RequestMapping("profile")
	public String testProfile(@Value("${jdbc}")String jdbc) {
		return "当前配置，jdbc=" + jdbc;
	}
	
	/**
	 * 
	 * @Description 测试跨域
	 * @date 2019年6月26日上午10:57:06
	 * @author fengjinan
	 * @return
	 *
	 */
	@RequestMapping("hello")
	public String testCrossDomain(HttpServletRequest request, HttpServletResponse response) {
		/*response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT");*/
		
		return "hello cross";
	}
}
