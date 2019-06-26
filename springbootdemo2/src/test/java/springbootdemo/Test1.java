package springbootdemo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import springbootdemo.controller.IndexController;
import springbootdemo.service.Impl.ConfigService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MainProgram.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ContextConfiguration(classes = {
      IndexController.class
})
@AutoConfigureMockMvc
public class Test1 {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private ConfigService configService;
	@Autowired
	private MockMvc mvc;
	@Test
	public void test() {
		log.info("测试用例：" + configService.getConfig().toString());
		//System.out.println(configService.getConfig());
	}
	
	@Test
	public void testMockMvc() throws Exception {
		mvc.perform(get("/test")).andExpect(status().isOk()).andExpect(content().string("hello world"));
	}
	
	
	
}
