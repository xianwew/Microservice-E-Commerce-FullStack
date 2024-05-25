package com.example.XianweiECommerce.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@Entity
public class Card extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String lastFourDigits;

    @Column(nullable = false)
    private LocalDate expirationDate;

    // Getters and setters are inherited from BaseEntity
}
