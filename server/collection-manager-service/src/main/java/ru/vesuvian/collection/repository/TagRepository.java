package ru.vesuvian.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Tag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    @Query("SELECT new Tag(t.id, t.name) FROM Tag t WHERE t.name = :tagName")
    Optional<Tag> findByNameExcludingCollections(@Param("tagName") String tagName);

    @Query("""
            SELECT t FROM Tag t
            JOIN CollectionTag ct ON t.id = ct.tag.id
            JOIN ct.collection c
            JOIN CustomerCollection cc ON c.id = cc.collection.id
            WHERE cc.customerId = :customerId AND c.id = :collectionId
            """)
    Optional<List<Tag>> findTagsByCustomerIdAndCollectionId(@Param("collectionId") Long collectionId,
                                                            @Param("customerId") UUID customerId);

    @Query("""
            SELECT t FROM Tag t
            JOIN CollectionTag ct ON t.id = ct.tag.id
            JOIN ct.collection c
            JOIN CustomerCollection cc ON c.id = cc.collection.id
            WHERE cc.customerId = :customerId AND c.id = :collectionId AND t.id = :tagId
            """)
    Optional<Tag> findTagByCustomerIdAndCollectionIdAndTagId(@Param("collectionId") Long collectionId,
                                                             @Param("customerId") UUID customerId,
                                                             @Param("tagId") Integer tagId
    );
}