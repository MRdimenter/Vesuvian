package ru.vesuvian.collection;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
public class CollectionManagerApplication {
    public static void main(String[] args) {
        SpringApplication.run(CollectionManagerApplication.class);
    }

}