package ru.vesuvian.collection.entity;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_favorite_collections", indexes = {
        @Index(name = "idx_customer_favorite_collections_on_customer_and_collection",
                columnList = "customer_id, collection_id")
})
public class CustomerFavoriteCollection {

    @Id
    @SequenceGenerator(name = "customer_favorite_collection_sequence", sequenceName = "customer_favorite_collection_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_favorite_collection_sequence")
    private Long id;

    @Column(name = "customer_id")
    private String customerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id", nullable = false)
    private Collection collection;
}