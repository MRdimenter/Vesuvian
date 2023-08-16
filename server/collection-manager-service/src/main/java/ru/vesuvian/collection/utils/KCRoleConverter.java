package ru.vesuvian.collection.utils;


import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;


/**
 * JSON Web Token (JWT) — это JSON объект, который определен в открытом стандарте RFC 7519.
 * Он считается одним из безопасных способов передачи информации между двумя участниками.
 * Для его создания необходимо определить заголовок (header) с общей информацией по токену,
 * полезные данные (payload), такие как id пользователя, его роль и т.д. и подписи (signature).
 * JWT — это лишь строка в следующем формате header.payload.signature
 */

// ковертер данных JWT в роли Spring Security
public class KCRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {


    @Override
    public Collection<GrantedAuthority> convert(Jwt source) {

        // получаем доступ к разделу JSON
        Map<String, Object> realmAccess = (Map<String, Object>) source.getClaims().get("realm_access");

        //если раздел JSON не будет найден - значит нет ролей
        if (realmAccess == null || realmAccess.isEmpty()) {
            return new ArrayList<>(); // возвращаем пустую коллекцию
        }

        Collection<GrantedAuthority> returnValue = new ArrayList<>();

        // проходим по всем значениям из JSON
        for (String roleName : (List<String>) realmAccess.get("roles")) {
            // создаем объект SimpleGrantedAuthority - это дефолтная реализация GrantedAuthority
            returnValue.add(new SimpleGrantedAuthority("ROLE_" + roleName)); // префикс ROLE обязательный

        }
        return returnValue;
    }
}
