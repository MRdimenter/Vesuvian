package ru.vesuvian.collection.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tags",
        indexes = {
                @Index(name = "idx_tag_name", columnList = "name")
        })
public class Tag {

    public Tag(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    @Id
    @SequenceGenerator(
            name = "tags_sequence",
            sequenceName = "tags_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "tags_sequence")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    // Отношение один-ко-многим между Tag и CollectionTagRepository
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CollectionTag> collectionTags = new HashSet<>();
}