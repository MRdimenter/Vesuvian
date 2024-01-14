package ru.vesuvian.collection.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cards",
        indexes = {
                @Index(name = "index_on_collection_id", columnList = "collection_id")
        })
@EqualsAndHashCode(exclude = "collection")
@ToString(exclude = "collection")
public class Card {
    @Id
    @SequenceGenerator(
            name = "card_sequence",
            sequenceName = "card_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "card_sequence")
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id", nullable = false)
    private Collection collection;

    @Column(name = "term", nullable = false)
    @Size(
            min = 1,
            max = 1000,
            message = "Term length must be between 1 and 1000 characters"
    )
    private String term;

    @Column(name = "definition", nullable = false)
    @Size(
            min = 1,
            max = 1000,
            message = "Definition length must be between 1 and 1000 characters"
    )
    private String definition;

    @Column(name = "hint")
    @Size(
            min = 1,
            max = 255,
            message = "Hint length must be between 1 and 1000 characters"
    )
    private String hint;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime created_at;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @Column(name = "image_url")
    private String imageURL;

    @Column(name = "order_number", columnDefinition = "serial", insertable = false, updatable = false)
    private Integer orderNumber;
}
