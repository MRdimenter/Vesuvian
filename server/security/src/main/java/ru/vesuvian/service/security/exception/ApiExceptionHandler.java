package ru.vesuvian.service.security.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.ZonedDateTime;
import java.util.TimeZone;

@ControllerAdvice
@Slf4j
public class ApiExceptionHandler {


    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Object> handleApiRequestException(NotFoundException e) {
        var status = HttpStatus.NOT_FOUND;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        log.info("API Exception: Status - {}, Message - {}", status, e.getMessage());

        return new ResponseEntity<>(apiException, status);
    }
}
