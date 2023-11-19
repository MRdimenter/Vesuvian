package ru.vesuvian.collection.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "collections",
        indexes = {
                @Index(name = "idx_collections_id", columnList = "id"),
                @Index(name = "idx_collections_creator_customer_id", columnList = "creator_customer_id")
        })
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(onlyExplicitlyIncluded = true)
public class Collection {

    @Id
    @SequenceGenerator(name = "collection_sequence", sequenceName = "collection_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "collection_sequence")
    @Column(nullable = false, updatable = false)
    @EqualsAndHashCode.Include
    @ToString.Include
    private Long id;

    @Column(name = "creator_customer_id", nullable = false, columnDefinition = "TEXT")
    private String creatorCustomerId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "is_public")
    private Boolean isPublic;

    @CreationTimestamp
    @Column(name = "creation_date", nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "number_of_cards")
    private Integer numberOfCards = 0;

    @JsonIgnore
    @OneToMany(mappedBy = "collection", fetch = FetchType.LAZY)
    private Set<CustomerCollection> customerCollections;

    @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Card> cards;

    @OneToMany(mappedBy = "collection", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CollectionTag> collectionTags = new HashSet<>();

    public void incrementNumberOfCards() {
        numberOfCards++;
    }

    public void decrementNumberOfCards() {
        if (numberOfCards > 0) {
            numberOfCards--;
        }
    }

    public void updateModifiedDate() {
        modifiedDate = LocalDateTime.now(Clock.systemDefaultZone());
    }
}
