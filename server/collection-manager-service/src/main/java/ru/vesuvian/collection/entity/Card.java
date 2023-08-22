    package ru.vesuvian.collection.entity;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.*;
    import org.hibernate.annotations.CreationTimestamp;

    import java.time.LocalDateTime;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    @Table(name = "cards",
            indexes = {
                    @Index(name = "index_cards_collection_id", columnList = "collection_id")
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
        @Column(name = "card_id")
        private Long cardId;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "collection_id", nullable = false)
        private Collection collection;

        @Column(name = "term",
                nullable = false)
        private String term;

        @Column(name = "definition",
                nullable = false)
        private String definition;

        @Column(name = "hint")
        private String hint;

        @CreationTimestamp
        @Column(name = "creation_date",
                nullable = false)
        private LocalDateTime creationDate;

        @Column(name = "modified_date")
        private LocalDateTime modifiedDate;

        @Column(name = "image_url")
        private String imageURL;
    }
