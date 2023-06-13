package ru.vesuvian.service.customer.utils.mapping;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomerMapping {
    public List<CustomerRepresentationDto> mapUserRepresentationsToDtos(List<UserRepresentation> userRepresentationList) {
        return userRepresentationList.stream()
                .map(CustomerRepresentationDto::fromUserRepresentation)
                .collect(Collectors.toList());
    }

    public CustomerRepresentationDto mapUserRepresentationToDto(UserRepresentation userRepresentation) {
        return CustomerRepresentationDto.fromUserRepresentation(userRepresentation);
    }
}
