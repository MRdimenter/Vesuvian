package ru.vesuvian.collection.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

// Composite Key
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerCollectionId implements Serializable {

    @Column(name = "customer_id", columnDefinition = "UUID")
    private UUID customerId;

    @Column(name = "collection_id")
    private Long collectionId;
}
