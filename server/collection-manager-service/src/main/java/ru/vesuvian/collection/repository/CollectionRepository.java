package ru.vesuvian.collection.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Collection;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    @Query("SELECT c FROM Collection c JOIN FETCH c.cards card WHERE c.id = :collectionId AND card.id = :cardId")
    Optional<Collection> findByIdWithCards(@Param("collectionId") Long collectionId, @Param("cardId") Long cardId);

    @Query("""
            SELECT c FROM Collection c
            LEFT JOIN FETCH c.collectionTags ct
            LEFT JOIN FETCH ct.tag
            WHERE c.id = :collectionId
            """)
    Optional<Collection> findByIdWithTags(@Param("collectionId") Long collectionId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Collection c WHERE c.id = :collectionId")
    void deleteByCollectionId(@Param("collectionId") Long collectionId);


}
