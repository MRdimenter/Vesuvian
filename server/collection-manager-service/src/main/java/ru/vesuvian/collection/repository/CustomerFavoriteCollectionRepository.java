package ru.vesuvian.collection.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.vesuvian.collection.entity.CustomerFavoriteCollection;

import java.util.List;
import java.util.Optional;

public interface CustomerFavoriteCollectionRepository extends JpaRepository<CustomerFavoriteCollection, Long> {

    @Query("SELECT cfc FROM CustomerFavoriteCollection cfc " +
            "WHERE cfc.customerId = :customerId " +
            "AND cfc.collection.id = :collectionId")
    Optional<CustomerFavoriteCollection> findByCustomerIdAndCollectionId(
            @Param("customerId") String customerId,
            @Param("collectionId") Long collectionId
    );

    @Query("SELECT cfc.collection.id " +
            "FROM CustomerFavoriteCollection cfc " +
            "WHERE cfc.customerId = :customerId")
    List<Long> findFavoriteCollectionIdsByCustomerId(@Param("customerId") String customerId);

    boolean existsByCustomerIdAndCollectionId(String customerId, Long collection_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM CustomerFavoriteCollection cfc " +
            "WHERE cfc.customerId = :customerId " +
            "AND cfc.collection.id = :collectionId"
    )
    void deleteByCustomerIdAndCollectionId(
            @Param("customerId") String customerId,
            @Param("collectionId") Long collectionId
    );

}
