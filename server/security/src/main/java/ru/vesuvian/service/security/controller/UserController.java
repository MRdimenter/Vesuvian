package ru.vesuvian.service.security.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    
    @GetMapping("/test")
    public String getTestData() {
        log.info("Sent response with test data");
        return "test data";
    }
    
}
