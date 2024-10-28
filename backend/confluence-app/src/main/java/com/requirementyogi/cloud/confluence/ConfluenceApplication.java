package com.requirementyogi.cloud.confluence;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.requirementyogi.cloud")
@EnableJpaRepositories(basePackages = "com.requirementyogi.cloud")
public class ConfluenceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfluenceApplication.class, args);
    }

}
