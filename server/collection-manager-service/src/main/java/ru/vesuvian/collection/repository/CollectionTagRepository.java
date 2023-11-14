package ru.vesuvian.collection.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.CollectionTag;

@Repository
public interface CollectionTagRepository extends JpaRepository<CollectionTag, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM CollectionTag ct WHERE ct.collection.collectionId = :collectionId")
    void deleteByCollectionId(@Param("collectionId") Long collectionId);


}
