package ru.vesuvian.collection.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;


@ControllerAdvice
@Slf4j
public class ApiExceptionHandler {

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<Object> handleUnauthorizedAccessException(UnauthorizedAccessException e) {
        var status = HttpStatus.FORBIDDEN;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        log.info("API Exception: Status - {}, Message - {}", status, e.getMessage());

        return new ResponseEntity<>(apiException, status);
    }

    @ExceptionHandler(CollectionNotFoundException.class)
    public ResponseEntity<Object> handleUnauthorizedAccessException(CollectionNotFoundException e) {
        var status = HttpStatus.NOT_FOUND;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        log.info("API Exception: Status - {}, Message - {}", status, e.getMessage());

        return new ResponseEntity<>(apiException, status);
    }

    @ExceptionHandler(TagAlreadyExistsInCollectionException.class)
    public ResponseEntity<Object> handleUnauthorizedAccessException(TagAlreadyExistsInCollectionException e) {
        var status = HttpStatus.CONFLICT;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        log.info("API Exception: Status - {}, Message - {}", status, e.getMessage());

        return new ResponseEntity<>(apiException, status);
    }

    @ExceptionHandler(MaxTagsPerCollectionReachedException.class)
    public ResponseEntity<Object> handleUnauthorizedAccessException(MaxTagsPerCollectionReachedException e) {
        var status = HttpStatus.UNPROCESSABLE_ENTITY;
        var apiException = new ApiException(e.getMessage(), status, ZonedDateTime.now());

        log.info("API Exception: Status - {}, Message - {}", status, e.getMessage());

        return new ResponseEntity<>(apiException, status);
    }
}
