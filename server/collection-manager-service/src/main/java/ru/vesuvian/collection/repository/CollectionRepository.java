package ru.vesuvian.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.Collection;

import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    @Query("SELECT c FROM Collection c JOIN FETCH c.cards WHERE c.collectionId = :collectionId")
    //@Query("SELECT c FROM Collection c LEFT JOIN FETCH c.cards cards LEFT JOIN FETCH cards.termLanguage LEFT JOIN FETCH cards.definitionLanguage WHERE c.collectionId = :collectionId")
    Collection findByIdWithCards(@Param("collectionId") Long collectionId);
}
