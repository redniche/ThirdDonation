package com.thirdlife.thirddonation.config;

import java.io.File;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

/**
 * 파일 저장을 위한  WebMvcConfig.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    public static final String UPLOAD_PATH = "/upload/file";

    public static final String ABSOLUTE_PATH = new File("").getAbsolutePath().replace('\\', '/');

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(UPLOAD_PATH + "/**")
                .addResourceLocations("file:///" + ABSOLUTE_PATH + UPLOAD_PATH + "/")
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new PageableHandlerMethodArgumentResolver());
    }
}
