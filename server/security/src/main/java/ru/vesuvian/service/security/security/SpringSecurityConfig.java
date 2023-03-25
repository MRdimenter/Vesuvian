package ru.vesuvian.service.security.security;

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
import ru.vesuvian.service.security.utils.KCRoleConverter;

// помечаем класс как конфиг для Spring
@Configuration
// включает механизм защиты адресов, которые настраиваются в SecurityFilterChain
@EnableWebSecurity
// включение механизом для защиты методов по ролям
@EnableMethodSecurity
// исключаем авто кофигурацию подключения к БД
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, DataSourceTransactionManagerAutoConfiguration.class})
public class SpringSecurityConfig {

    @Value("clientURL")
    private String clientURL; // клиентский URL


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
                .cors() // разрешаем запросы типа OPTIONS
                .and()
                .oauth2ResourceServer() // влкючаем защиту OAUTH2
                .jwt() // использует JWT для получения Access Token
                .jwtAuthenticationConverter(jwtAuthenticationConverter); // добавляем конвертер ролей из JWT в Authority

        return httpSecurity.build();
    }

}