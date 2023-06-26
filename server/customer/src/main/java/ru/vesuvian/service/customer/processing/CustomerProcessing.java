package ru.vesuvian.service.customer.processing;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.UsersResource;
import org.springframework.stereotype.Component;
import ru.vesuvian.service.customer.dto.CustomerRepresentationDto;
import ru.vesuvian.service.customer.utils.mapping.CustomerMapping;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomerProcessing {
    private final CustomerMapping customerMapping;

    public int calculateTotalPageCount(int totalItemCount, int pageSize) {
        return (int) Math.ceil((double) totalItemCount / pageSize);
    }

    public List<CustomerRepresentationDto> retrieveUsersData(UsersResource usersResource, int offset, int limit) {
        return customerMapping.mapUserRepresentationsToDtos(usersResource.search(null, offset, limit));
    }
}
