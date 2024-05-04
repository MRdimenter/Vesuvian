package ru.vesuvian.service.customer.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.vesuvian.service.customer.exception.OAuth2ExceptionHandler;
import ru.vesuvian.service.customer.utils.KCRoleConverter;

import javax.ws.rs.HttpMethod;
import java.util.List;

// помечаем класс как конфиг для Spring
@Configuration
// включает механизм защиты адресов, которые настраиваются в SecurityFilterChain
@EnableWebSecurity
// включение механизмов для защиты методов по ролям
@EnableMethodSecurity
// исключаем авто кофигурацию подключения к БД
//@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class})
@RequiredArgsConstructor
public class SpringSecurityConfig {

    @Value("${clientURL}")
    private String clientURL; // клиентский URL
    private final OAuth2ExceptionHandler oAuth2ExceptionHandler;

    /**
     * Создается специальный бин который отвечает за настройки запросов по HTTP
     * Spring вызывает метод автоматически
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        // конвертер для настройки Spring Security
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        // подключаем конвертер ролей
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new KCRoleConverter());

        httpSecurity
                .authorizeHttpRequests()
                .requestMatchers("/swagger-ui/**").permitAll() // or hasRole, hasAnyRole, hasAuthority, hasAnyAuthority as per your requirement
                .requestMatchers("/swagger-resources/**").permitAll()
                .requestMatchers("/webjars/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/customers/create").permitAll()
                .requestMatchers("/api/v1/customers/*").hasRole("user")
                .requestMatchers("/actuator/zipkin/**").permitAll() // Разрешаем доступ к Micrometer Zipkin
                .anyRequest().authenticated() // остальной API будет доступен только аутентифицированным пользователям
                .and()
                .csrf().disable()  // отключаем встроенную защиту от csrf атак, используется из OAUTH2
                .cors() // разрешаем запросы типа OPTIONS (preflight - проверочный запрос перед основным)
                .and()
                .oauth2ResourceServer() // влкючаем защиту OAUTH2
                .jwt() // использует JWT для получения Access Token
                .jwtAuthenticationConverter(jwtAuthenticationConverter) // добавляем конвертер ролей из JWT в Authority
                .and()
                .authenticationEntryPoint(oAuth2ExceptionHandler); // все ошибки которые будут возникать в библиотеки OAuth2 будут обрабатываться в классе OAuth2ExceptionHandler
        return httpSecurity.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().requestMatchers("/swagger-ui", "/swagger-ui/**", "/error", "/v3/api-docs/**", "/swagger-ui.html", "/swagger/v1/customers");
    }

    /**
     * Задаем настройки с каких конкретно сайтов мы можем получать запросы
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("*")); // на этот микросервис разрешаем запросы только от clientURL
        corsConfiguration.setAllowedHeaders(List.of("*")); // указываем какие заголовки мы разрешаем в запросе
        corsConfiguration.setAllowedMethods(List.of("*")); // указываем какие методы мы разрешаем в запросе (post, get, update, delete)
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
