package ru.vesuvian.service.customer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
@Entity()
@Table(
        name = "customers", // имя таблицы
        uniqueConstraints = { // ограничения по уникальности
                @UniqueConstraint(
                        name = "customer_username_unique", // наименование ограничения в БД
                        columnNames = "user_name" // колонка таблицы которая использует такое ограничение
                )
        }
)
public class Customer {
    @Id
    @SequenceGenerator(
            name = "customer_sequence",
            sequenceName = "customer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "customer_sequence")
    @Column(
            name = "id",
            nullable = false,
            updatable = false)
    private Long id;


    @Column(
            name = "UUID",
            nullable = false,
            updatable = false)
    private String UUID;

    @NotBlank(message = "email must be not empty")
    @Email
    private String email;

    @Column(
            name = "user_name", //имя колонки
            columnDefinition = "TEXT", // тип колонки
            nullable = false // не должно быть null
    )
    @NotBlank(message = "username must be not empty")
    private String username;

    @Column(
            name = "first_name", //имя колонки
            columnDefinition = "TEXT", // тип колонки
            nullable = false // не должно быть null
    )
    private String firstName;

    @Column(
            name = "last_name", //имя колонки
            columnDefinition = "TEXT", // тип колонки
            nullable = false // не должно быть null
    )
    private String lastName;

    @CreationTimestamp
    @Column(name = "creation_date")
    private LocalDateTime createdAt;

    @Column(name = "modified_date")
    private LocalDateTime modifiedAt;
}
