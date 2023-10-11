package ru.vesuvian.service.customer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vesuvian.service.customer.entity.Customer;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUUID(String userId);

    /**
     * Retrieves a paginated list of users with IDs greater than the specified last ID,
     * ordered by the user's ID in ascending order.
     * This method implements keyset pagination using the auto-generated primary key.
     *
     * @param lastId   The last seen user ID. Pass 0 or null to retrieve the first page.
     * @param pageable The pagination information (page number, page size, etc.).
     * @return A Page containing the requested users.
     * */
    Page<Customer> findAllByIdGreaterThanOrderByIdAsc(Long lastId, Pageable pageable);
}
