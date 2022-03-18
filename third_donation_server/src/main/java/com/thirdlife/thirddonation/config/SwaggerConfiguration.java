package com.thirdlife.thirddonation.config;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Configuration for Swagger2.
 */
@EnableSwagger2
@Configuration
public class SwaggerConfiguration {
    //Swagger 설정 확인
    //http://localhost:8000/{your-app-root}/v2/api-docs
    //Swagger-UI 확인
    //http://localhost:port/{your-app-root}/swagger-ui.html

    private String version = "V1";
    private String title = "SSAFY GuestBook API " + version;

    /**
     * Return Docket instance for swagger configuration.
     *
     * @return Docket instance
     */
    @Bean
    public Docket api() {
        List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
        responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
        responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!")
                .responseModel(new ModelRef("Error")).build());
        responseMessages.add(new ResponseMessageBuilder()
                .code(404).message("페이지를 찾을 수 없습니다 !!!").build());
        return new Docket(DocumentationType.SWAGGER_2)
                .consumes(getConsumeContentTypes()).produces(getProduceContentTypes())
                .apiInfo(apiInfo()).groupName(version).select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/api/**")).build()
                .useDefaultResponseMessages(false)
                .globalResponseMessage(RequestMethod.GET, responseMessages);
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
        return new ApiInfoBuilder().title(title)
                .description("")
                .contact(new Contact("ThirdDonation", "https://temp.com", "third_donation@gmail.com"))
                .license("Temp License")
                .licenseUrl("Temp Licnse Link")
                .version("1.0").build();

    }

}
