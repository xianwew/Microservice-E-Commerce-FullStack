package com.example.XianweiECommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
//                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.GET, "/api/user/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/feedback/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/api/item").authenticated()
//                        .requestMatchers(HttpMethod.PUT, "/api/item/**").authenticated()
//                        .requestMatchers(HttpMethod.DELETE, "/api/item/**").authenticated()
//                        .requestMatchers("/api/user/{id}").authenticated()
//                        .requestMatchers("/api/cart/{id}").authenticated()
                        .anyRequest().permitAll()
                )
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}