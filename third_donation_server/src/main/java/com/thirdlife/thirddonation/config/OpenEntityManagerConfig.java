package com.thirdlife.thirddonation.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;

/**
 * 엔티티 매니저 설정 클래스입니다.
 */
@Configuration
public class OpenEntityManagerConfig {
    /**
     * 엔티티 매니저 스프링 빈 영속성 관련 에러 해결용 메서드입니다.
     *
     * @return FilterRegistrationBean
     */
    @Bean
    public FilterRegistrationBean<OpenEntityManagerInViewFilter> openEntityManagerInViewFilter() {
        FilterRegistrationBean<OpenEntityManagerInViewFilter> filterFilterRegistrationBean =
                new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new OpenEntityManagerInViewFilter());
        filterFilterRegistrationBean.setOrder(Integer.MIN_VALUE); // 최우선 순위로 Filter 등록
        return filterFilterRegistrationBean;
    }
}
