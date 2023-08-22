package ru.vesuvian.collection.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "collections",
        indexes = {
                @Index(name = "index_collections_collection_id", columnList = "collection_id"),
                @Index(name = "index_collections_creator_customer_id", columnList = "creator_customer_id")
        })
@EqualsAndHashCode(exclude = {"cards", "customerCollections"})
@ToString(exclude = {"cards", "customerCollections"})
public class Collection {

    @Id
    @SequenceGenerator(
            name = "collection_sequence",
            sequenceName = "collection_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "collection_sequence")
    @Column(
            name = "collection_id",
            nullable = false,
            updatable = false)
    private Long collectionId;

    @Column(
            name = "creator_customer_id",
            nullable = false,
            columnDefinition = "TEXT")
    private String creatorCustomerId;

    @Column(
            name = "collection_name",
            nullable = false,
            columnDefinition = "TEXT")
    private String collectionName;

    @Column(name = "is_public")
    private Boolean isPublic;

    @CreationTimestamp
    @Column(name = "creation_date",
            nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(
            name = "description",
            columnDefinition = "TEXT")
    private String description;

    @Column(name = "rating", columnDefinition = "DECIMAL(3,2)")
    private Double rating;

    @Column(name = "number_of_cards")
    private Integer numberOfCards;

    @JsonIgnore
    @OneToMany(mappedBy = "collection", fetch = FetchType.LAZY)
    private Set<CustomerCollection> customerCollections;

    @OneToMany(mappedBy = "collection",
            cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Card> cards;

    @JsonView
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "collection_tags",
            joinColumns = @JoinColumn(name = "collection_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;
}
