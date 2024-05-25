package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "items")
public class Item extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sellerId", nullable = false)
    private User seller;

    @Column(nullable = false)
    private String title;

    @Lob
    private String description;

    @Column(nullable = false)
    private double price;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "mainCategoryId", nullable = false)
    private MainCategory mainCategory;

    @ManyToOne
    @JoinColumn(name = "subCategoryId", nullable = false)
    private SubCategory subCategory;

    @OneToOne
    @JoinColumn(name = "ratingId")
    private Rating rating;

    @Column(nullable = false)
    private LocalDateTime dateListed;

    // Getters and setters are inherited from BaseEntity
    @PrePersist
    protected void onCreate() {
        dateListed = LocalDateTime.now();
    }
}