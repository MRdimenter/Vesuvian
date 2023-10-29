package ru.vesuvian.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Collection;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    @Query("SELECT c FROM Collection c JOIN FETCH c.cards card WHERE c.collectionId = :collectionId AND card.cardId = :cardId")
    Optional<Collection> findByIdWithCards(@Param("collectionId") Long collectionId, @Param("cardId") Long cardId);

    @Query("SELECT c FROM Collection c " +
            "LEFT JOIN FETCH c.collectionTags ct " +
            "LEFT JOIN FETCH ct.tag " +
            "WHERE c.collectionId = :collectionId")
    Optional<Collection> findByIdWithTags(@Param("collectionId") Long collectionId);
}
