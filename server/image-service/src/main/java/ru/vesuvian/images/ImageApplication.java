package ru.vesuvian.images;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "ru.vesuvian.images",
        "ru.vesuvian.amqp",
})
public class ImageApplication {
    public static void main(String[] args) {
        SpringApplication.run(ImageApplication.class);
    }

}