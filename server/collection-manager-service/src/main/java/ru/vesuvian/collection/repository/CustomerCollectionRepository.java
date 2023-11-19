package ru.vesuvian.collection.repository;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query("SELECT cc FROM CustomerCollection cc JOIN FETCH cc.collection WHERE cc.customerId = :customerId AND cc.collection.id = :collectionId")
    Optional<CustomerCollection> findByCustomerIdAndCollectionId(@Param("customerId") String customerId, @Param("collectionId") Long collectionId);

    @Query("SELECT cc FROM CustomerCollection cc JOIN FETCH cc.collection c LEFT JOIN FETCH c.collectionTags ct LEFT JOIN FETCH ct.tag WHERE cc.customerId = :customerId")
    List<CustomerCollection> findByCustomerIdWithCollectionsAndTags(@Param("customerId") String customerId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CustomerCollection c WHERE c.collectionId = :collectionId")
    void deleteByCollectionId(@Param("collectionId") Long collectionId);
}
