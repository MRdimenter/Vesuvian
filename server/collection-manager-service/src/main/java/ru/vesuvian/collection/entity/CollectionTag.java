package ru.vesuvian.collection.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "collection_tag", indexes = {
        @Index(name = "idx_collection_tag_on_collection_and_tag", columnList = "collection_id, tag_id")
})
public class CollectionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    @EqualsAndHashCode.Include
    private Collection collection;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    @EqualsAndHashCode.Include
    private Tag tag;
}
