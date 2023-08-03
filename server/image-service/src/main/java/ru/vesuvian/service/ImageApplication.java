package ru.vesuvian.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "ru.vesuvian.service",
        "ru.vesuvian.amqp",
})
public class ImageApplication {
    public static void main(String[] args) {
        SpringApplication.run(ImageApplication.class);
    }

}