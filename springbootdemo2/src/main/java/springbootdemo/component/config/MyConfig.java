package springbootdemo.component.config;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@ConfigurationProperties(prefix="my-config") 
@Data
public class MyConfig {
	  private Map<String, String> item1;
	  private Map<String, String> item2;
}
