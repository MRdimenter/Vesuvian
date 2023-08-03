package ru.vesuvian.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.vesuvian.service.entity.CustomerAvatar;

import java.util.Optional;

@Repository
public interface CustomerAvatarRepository extends JpaRepository<CustomerAvatar, Long> {

    @Query("SELECT ca.defaultAvatarURL FROM CustomerAvatar ca WHERE ca.customerUUID = ?1")
    Optional<String> findAvatarUrlByCustomerUUID(String UUID);

}
