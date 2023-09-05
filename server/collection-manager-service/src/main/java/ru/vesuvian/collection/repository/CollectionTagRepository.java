package ru.vesuvian.collection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.vesuvian.collection.entity.CollectionTag;

@Repository
public interface CollectionTagRepository extends JpaRepository<CollectionTag, Long> {



}
