package ru.vesuvian.images.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "customer_avatars",
        indexes = {
                @Index(
                        name = "idx_customer_avatars_user_uuid",
                        columnList = "customer_uuid")
        },
        uniqueConstraints = { // ограничения по уникальности
                @UniqueConstraint(
                        name = "customer_uuid_unique", // наименование ограничения в БД
                        columnNames = "customer_uuid" // колонка таблицы которая использует такое ограничение
                )
        })
public class CustomerAvatar {
    @Id
    @SequenceGenerator(
            name = "customer_avatar_sequence",
            sequenceName = "customer_avatar_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "customer_avatar_sequence")
    @Column(
            name = "id",
            nullable = false,
            updatable = false)
    private Long id;

    @Column(
            name = "customer_uuid",
            nullable = false,
            columnDefinition = "TEXT")
    private String customerUUID;

    @Column(
            name = "default_avatar_url",
            nullable = false,
            columnDefinition = "TEXT")
    private String defaultAvatarURL;

    @CreationTimestamp
    @Column(name = "created_at",
            nullable = false)
    private LocalDateTime createdAt;

}