package ru.vesuvian.collection.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_collections",
        indexes = {
                @Index(name = "index_customer_id", columnList = "customer_id"),
                @Index(name = "index_collection_id", columnList = "collection_id")
        })
@IdClass(CustomerCollectionId.class)
public class CustomerCollection {

    @Id
    @Column(name = "customer_id", columnDefinition = "UUID")
    private UUID customerId;

    @Id
    @Column(name = "collection_id")
    private Long collectionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id", insertable = false, updatable = false)
    private Collection collection;
}
