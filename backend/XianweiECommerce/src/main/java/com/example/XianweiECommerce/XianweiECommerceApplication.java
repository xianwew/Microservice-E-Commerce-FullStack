package com.example.XianweiECommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication()
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class XianweiECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(XianweiECommerceApplication.class, args);
	}

}
