package ru.vesuvian.collection.repository;


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
            "JOIN CustomerCollection cc ON cc.collectionId = c.collection.collectionId " +
            "WHERE c.collection.collectionId = :collectionId " +
            "AND cc.customerId = :customerId")
    Optional<List<Card>> findCardsByCollectionIdAndCustomerId(@Param("collectionId") Long collectionId,
                                                              @Param("customerId") String customerId);


//    @Modifying
//    @Query(value = "INSERT INTO cards (term, definition, hint, image_url, collection_id) VALUES (:term, :definition, :hint, :imageUrl, :collectionId)", nativeQuery = true)
//    void saveWithCollectionId(@Param("term") String term, @Param("definition") String definition, @Param("hint") String hint, @Param("imageUrl") String imageUrl, @Param("collectionId") Long collectionId);
}
