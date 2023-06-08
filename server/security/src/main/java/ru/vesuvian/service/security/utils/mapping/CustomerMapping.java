package ru.vesuvian.service.security.utils.mapping;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.security.dto.CustomerRepresentationDto;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomerMapping {
    public List<CustomerRepresentationDto> mapUserRepresentationsToDtos(List<UserRepresentation> userRepresentationList) {
        return userRepresentationList.stream()
                .map(CustomerRepresentationDto::fromUserRepresentation)
                .collect(Collectors.toList());
    }
}
