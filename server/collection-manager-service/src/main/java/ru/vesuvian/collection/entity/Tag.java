package ru.vesuvian.collection.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tags",
        indexes = {
                @Index(name = "idx_tag_name", columnList = "name")
        })
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(onlyExplicitlyIncluded = true)
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
    @EqualsAndHashCode.Include
    @ToString.Include
    private Integer id;

    @Column(name = "name")
    @Size(
            min = 1,
            max = 15,
            message = "Name length must be between 1 and 15 characters"
    )
    private String name;

    // Отношение один-ко-многим между Tag и CollectionTagRepository
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CollectionTag> collectionTags = new HashSet<>();
}