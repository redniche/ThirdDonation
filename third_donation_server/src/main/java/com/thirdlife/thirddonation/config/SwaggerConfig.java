package com.thirdlife.thirddonation.config;

import java.util.HashSet;
import java.util.Set;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Configuration for Swagger2.
 */
@Configuration
public class SwaggerConfig {

    private final String version = "V1";
    private final String title = "Third Donation API " + version;

    /**
     * Return Docket instance for swagger configuration.
     *
     * @return Docket instance
     */
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .apiInfo(apiInfo())
                .groupName(version)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/api/**"))
                .build()
                ;
    }

    /**
     * Return kinds of document when request(consumes).
     *
     * @return Set&lt;String&gt;
     */
    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<String>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/xml;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    /**
     * Return kinds of document when response(produces).
     *
     * @return Set&lt;String&gt;
     */
    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<String>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    /**
     * Return ApiInfo instance.
     *
     * @return ApiInfo instance
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .description("")
                .contact(new Contact("ThirdDonation", "https://j6e207.p.ssafy.io/", "third_donation@gmail.com"))
                .license("Temp License")
                .licenseUrl("Temp Licnse Link")
                .version("1.0").build();

    }
}
