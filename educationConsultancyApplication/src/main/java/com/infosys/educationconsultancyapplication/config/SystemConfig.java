package com.infosys.educationconsultancyapplication.config;

import com.infosys.educationconsultancyapplication.bean.EduconUser;
import com.infosys.educationconsultancyapplication.service.EduconUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
//@EnableMethodSecurity
@EnableWebSecurity
public class SystemConfig {
    @Autowired
    private EncoderConfig encoderConfig;

    @Autowired
//    private EduconUserService service;
    private EduconUserService service;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeHttpRequests((authorize) ->
//                authorize
////                        .requestMatchers(HttpMethod.POST, "/educon/edu-con/signup", "/edu-con/login","/edu-con/admin/signup","/edu-con/test2","/edu-con/**").permitAll()
//                        .requestMatchers(HttpMethod.POST,"educon/edu-con/login").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/edu-con/**").permitAll()
//                        .requestMatchers("/edu-con/admin/**").hasAuthority("ROLE_ADMIN")
//                        .anyRequest().authenticated()
//        );
//        http.csrf().disable().authorizeHttpRequests().requestMatchers("/educon/edu-con/signup","educon/edu-con/login").permitAll().anyRequest().authenticated();
//        return http.build();
        http
                .csrf().disable() // Disables CSRF protection
                .cors().and() // Enables CORS
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .httpBasic(); // Enables Basic Authentication
        return http.build();
    }
}
