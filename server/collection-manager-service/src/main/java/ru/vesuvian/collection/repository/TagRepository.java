package ru.vesuvian.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Card;
import ru.vesuvian.collection.entity.Tag;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("SELECT new Tag(t.tagId, t.tagName) FROM Tag t WHERE t.tagName = :tagName")
    Optional<Tag> findByNameExcludingCollections(@Param("tagName") String tagName);

    @Query("SELECT t FROM Tag t " +
            "JOIN CollectionTag ct ON t.tagId = ct.tag.tagId " +
            "JOIN ct.collection c " +
            "JOIN CustomerCollection cc ON c.collectionId = cc.collection.collectionId " +
            "WHERE cc.customerId = :customerId AND c.collectionId = :collectionId")
    Optional<List<Tag>> findTagsByCustomerIdAndCollectionId(@Param("collectionId") Long collectionId,
                                                  @Param("customerId") String customerId);
}