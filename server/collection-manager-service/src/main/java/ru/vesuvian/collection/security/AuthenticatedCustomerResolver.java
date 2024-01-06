package ru.vesuvian.collection.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthenticatedCustomerResolver {

//    public String getAuthenticatedUUID() {
//        return SecurityContextHolder.getContext().getAuthentication().getName();
//    }

    public UUID getAuthenticatedUUID() {
        return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
