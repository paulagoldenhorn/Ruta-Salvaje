package com.dh.proyectoIntegrador.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static com.dh.proyectoIntegrador.entity.Role.ADMIN;
import static com.dh.proyectoIntegrador.entity.Role.BASIC;
import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AuthenticationProvider authenticationProvider;

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .antMatchers(
                        // Register and authentication endpoints:
                         "/auth/**",
                        // Swagger endpoints:
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources",
                        "/swagger-resources/**",
                        "/configuration/ui",
                        "/configuration/security",
                        "/swagger-ui/**",
                        "/webjars/**",
                        "/swagger-ui.html",
                        "/registerConfirm"
                )
                .permitAll()

                // Public access to GET requests:

                .antMatchers(GET, "/product/**").permitAll()
                .antMatchers(GET, "/category/**").permitAll()
                .antMatchers(GET, "/feature/**").permitAll()
                .antMatchers(GET, "/score/**").permitAll()

                // User access to endpoints:

                .antMatchers(POST, "/product/**").hasAuthority(ADMIN.getRoleName())
                .antMatchers(PUT, "/product/**").hasAuthority(ADMIN.getRoleName())
                .antMatchers(DELETE, "/product/**").hasAuthority(ADMIN.getRoleName())

                .antMatchers(POST, "/category/**").hasAuthority(ADMIN.getRoleName())
                .antMatchers(PUT, "/category/**").hasAuthority(ADMIN.getRoleName())
                .antMatchers(DELETE, "/category/**").hasAuthority(ADMIN.getRoleName())

                .antMatchers(POST, "/feature/**").hasAuthority(ADMIN.getRoleName())
                .antMatchers(PUT, "/feature/**").hasAuthority(ADMIN.getRoleName())
                .antMatchers(DELETE, "/feature/**").hasAuthority(ADMIN.getRoleName())

                .antMatchers(GET, "/user").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())
                .antMatchers(GET, "/user/all").hasAuthority(ADMIN.getRoleName())
                .antMatchers(PUT, "/user/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())
                .antMatchers(DELETE, "/user/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())

                .antMatchers(POST, "/score/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())
                .antMatchers(DELETE, "/score/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())

                .antMatchers(POST, "/reservation/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())
                .antMatchers(GET, "/reservation/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())
                .antMatchers(DELETE, "/reservation/**").hasAnyAuthority(ADMIN.getRoleName(), BASIC.getRoleName())

                .anyRequest()
                    .authenticated()

                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                .logout()
                    .logoutUrl("/auth/logout")
                    .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());

        return httpSecurity.build();
    }
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
