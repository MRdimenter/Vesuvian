package ru.vesuvian.service.security.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.vesuvian.service.security.model.User;

@RestController
@RequestMapping("api/v1/users")
@Slf4j
public class UserController {


    @GetMapping("/test")
    public String getTestData() {
        log.info("Sent response with test data");
        return "test data";
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody User user) {
        log.info(user.getUsername());
        log.info(user.getFirstName());
        log.info(user.getLastName());
        log.info(user.getEmail());

    }
}
