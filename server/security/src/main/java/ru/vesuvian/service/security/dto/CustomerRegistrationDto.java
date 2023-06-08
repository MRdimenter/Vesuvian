package ru.vesuvian.service.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerRegistrationDto {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
