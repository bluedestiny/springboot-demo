package springbootdemo.service.Impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springbootdemo.component.config.MyConfig;
@Service
public class ConfigServiceImpl implements ConfigService{
	@Autowired
	private MyConfig config;
	@Override
	public Map<String, String> getConfig() {
		return config.getItem1();
	}

}
