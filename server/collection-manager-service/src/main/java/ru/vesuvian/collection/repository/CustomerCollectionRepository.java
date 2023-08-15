package ru.vesuvian.collection.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.CustomerCollection;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerCollectionRepository extends JpaRepository<CustomerCollection, Long>, JpaSpecificationExecutor<CustomerCollection> {
    @Query("SELECT cc FROM CustomerCollection cc JOIN FETCH cc.collection WHERE cc.customerId = :customerId")
    List<CustomerCollection> findByCustomerIdWithCollections(@Param("customerId") String customerId);

    @Query("SELECT cc FROM CustomerCollection cc JOIN FETCH cc.collection WHERE cc.customerId = :customerId AND cc.collection.collectionId = :collectionId")
    Optional<CustomerCollection> findByCustomerIdAndCollectionId(@Param("customerId") String customerId, @Param("collectionId") Long collectionId);
}
