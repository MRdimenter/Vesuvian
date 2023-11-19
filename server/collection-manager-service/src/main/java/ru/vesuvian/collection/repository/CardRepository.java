package ru.vesuvian.collection.repository;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Card;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query("SELECT c FROM Card c " +
            "JOIN CustomerCollection cc ON cc.collectionId = c.collection.id " +
            "WHERE c.collection.id = :collectionId " +
            "AND cc.customerId = :customerId " +
            "ORDER BY c.orderNumber")
    Optional<List<Card>> findCardsByCollectionIdAndCustomerIdOrderByOrderNumber(@Param("collectionId") Long collectionId,
                                                                                @Param("customerId") String customerId);


    @Query("SELECT c FROM Card c " +
            "JOIN CustomerCollection cc ON cc.collectionId = c.collection.id " +
            "WHERE c.collection.id = :collectionId " +
            "AND cc.customerId = :customerId " +
            "AND c.cardId = :cardId"
    )
    Optional<Card> findCardByCollectionIdAndCustomerIdAndCardId(@Param("collectionId") Long collectionId,
                                                                @Param("customerId") String customerId,
                                                                @Param("cardId") Long cardId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Card c WHERE c.collection.id = :collectionId")
    void deleteByCollectionId(@Param("collectionId") Long collectionId);

}
