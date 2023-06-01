package ru.vesuvian.service.security.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}
