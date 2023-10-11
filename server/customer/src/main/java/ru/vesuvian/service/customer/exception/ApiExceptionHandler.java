package ru.vesuvian.service.customer.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.ZonedDateTime;

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

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<Object> handleUserExistsException(UserExistsException e) {
        var status = HttpStatus.CONFLICT;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        return new ResponseEntity<>(apiException, status);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(UserRightsViolationException.class)
    public ResponseEntity<Object> handleUserRightsViolationException(UserRightsViolationException e) {
        var status = HttpStatus.FORBIDDEN;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        return new ResponseEntity<>(apiException, status);
    }
}
