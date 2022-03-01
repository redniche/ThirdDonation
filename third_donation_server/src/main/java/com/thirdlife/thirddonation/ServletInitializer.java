package com.thirdlife.thirddonation;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * ServletInitializer for project.
 */
public class ServletInitializer extends SpringBootServletInitializer {

    /**
     * Builder for SpringApplication and ApplicationContext instances.
     *
     * @param application SpringApplicationBuilder instance
     * @return SpringApplicationBuilder instance
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ThirdDonationApplication.class);
    }

}
