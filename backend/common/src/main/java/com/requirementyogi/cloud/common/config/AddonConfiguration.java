package com.requirementyogi.cloud.common.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("addon")
@Getter
@Setter
public class AddonConfiguration {

    private String key;
    private String baseUrl;

}
