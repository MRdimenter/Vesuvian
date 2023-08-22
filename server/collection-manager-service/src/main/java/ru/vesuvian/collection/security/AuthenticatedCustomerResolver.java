package ru.vesuvian.collection.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedCustomerResolver {

    public String getAuthenticatedCustomerId() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
