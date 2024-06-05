package com.example.XianweiECommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication()
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EntityScan(basePackages = "com.example.XianweiECommerce.model")
@EnableJpaRepositories(basePackages = "com.example.XianweiECommerce.repository")
public class ItemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItemApplication.class, args);
	}

}
