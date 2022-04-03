package com.thirdlife.thirddonation.config;

import com.thirdlife.thirddonation.api.user.service.UserService;
import com.thirdlife.thirddonation.common.auth.JwtAuthenticationFilter;
import com.thirdlife.thirddonation.db.user.entity.Authority;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;

/**
 * 스프링 시큐리티 설정 클래스입니다.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final UserService userService;

    @Value("${request.path.api}")
    private String apiPath;

    @Value("${request.path.users}")
    private String usersPath;

    @Value("${request.path.nfts}")
    private String nftsPath;

    @Value("${request.path.charities}")
    private String charitiesPath;

    @Value("${request.path.notifications}")
    private String notificationsPath;

    @Value("${request.path.board}")
    private String boardPath;

    @Value("${request.path.board.category}")
    private String categoryPath;

    @Value("${request.path.admin.artists}")
    private String artistsPath;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().sameOrigin();
        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .addFilter(corsFilter)
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), userService))
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, apiPath + usersPath + artistsPath).hasAuthority(
                        Authority.ADMIN.name())
                .antMatchers(HttpMethod.PATCH, apiPath + usersPath + artistsPath).hasAuthority(
                        Authority.ADMIN.name())
                .antMatchers("/api/**").permitAll()
                .anyRequest().permitAll()
                .and().cors();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs/**");
        web.ignoring().antMatchers("/swagger.json");
        web.ignoring().antMatchers("/swagger-ui/**");
        web.ignoring().antMatchers("/swagger-resources/**");
        web.ignoring().antMatchers("/webjars/**");
    }
}
