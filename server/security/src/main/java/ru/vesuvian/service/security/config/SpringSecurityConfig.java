package ru.vesuvian.service.security.config;

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
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import ru.vesuvian.service.security.exception.OAuth2ExceptionHandler;
import ru.vesuvian.service.security.utils.KCRoleConverter;

import java.util.List;

// помечаем класс как конфиг для Spring
@Configuration
// включает механизм защиты адресов, которые настраиваются в SecurityFilterChain
@EnableWebSecurity
// включение механизмов для защиты методов по ролям
@EnableMethodSecurity
// исключаем авто кофигурацию подключения к БД
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class})
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

        httpSecurity.authorizeHttpRequests()
                .requestMatchers("/admin/*").hasRole("admin") //CRUD для работы с пользователем
                .requestMatchers("/user/*").hasRole("user")
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

    /**
     * Задаем настройки с каких конкретно сайтов мы можем получать запросы
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        //corsConfiguration.setAllowedOrigins(Collections.singletonList(clientURL)); // на этот микросервис разрешаем запросы только от clientURL
        corsConfiguration.setAllowedHeaders(List.of("*")); // указываем какие заголовки мы разрешаем в запросе
        corsConfiguration.setAllowedMethods(List.of("*")); // указываем какие методы мы разрешаем в запросе (post, get, update, delete)
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

}
