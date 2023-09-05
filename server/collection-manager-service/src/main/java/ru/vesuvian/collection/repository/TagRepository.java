package ru.vesuvian.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Tag;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT new Tag(t.tagId, t.tagName) FROM Tag t WHERE t.tagName = :tagName")
    Optional<Tag> findByNameExcludingCollections(@Param("tagName") String tagName);

}