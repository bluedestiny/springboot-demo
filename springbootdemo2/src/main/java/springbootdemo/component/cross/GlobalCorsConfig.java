package springbootdemo.component.cross;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class GlobalCorsConfig {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {

			@Override
			public void addCorsMappings(CorsRegistry registry) {
				 registry.addMapping("/**")
                 //放行哪些原始域
                 .allowedOrigins("*")
                 //是否发送Cookie信息
                 .allowCredentials(true)
                 //放行哪些原始域(请求方式)
                 .allowedMethods("GET","POST", "PUT", "DELETE");
			}
			
		};
	}
}
