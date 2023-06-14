package ru.vesuvian.service.customer.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;


/**
 * Обработка ошибок OAuth2
 */
@Component
@Slf4j
public class OAuth2ExceptionHandler implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        final var jsonBody = new HashMap<>();
        final var mapper = new ObjectMapper();

        jsonBody.put("type", authException.getClass().getSimpleName());
        jsonBody.put("class", authException.getClass());
        jsonBody.put("message", authException.getMessage());
        jsonBody.put("exception", authException.getCause());
        jsonBody.put("path", request.getServletPath());
        jsonBody.put("timestamp", new Date().getTime());

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        mapper.writeValue(response.getOutputStream(), jsonBody);
    }


}


