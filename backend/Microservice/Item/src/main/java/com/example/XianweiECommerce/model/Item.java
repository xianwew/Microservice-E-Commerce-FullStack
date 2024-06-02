package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "items")
public class Item extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seller_id", nullable = false)
    private String sellerId;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Lob
    private String longDescription;

    @Column(nullable = false)
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private double price;

    @Column(nullable = false)
    private String imageUrl;

    private String subImageUrl1;
    private String subImageUrl2;
    private String subImageUrl3;
    private String subImageUrl4;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String country;

    @ManyToOne
    @JoinColumn(name = "mainCategoryId", nullable = false)
    private MainCategory mainCategory;

    @ManyToOne
    @JoinColumn(name = "subCategoryId", nullable = false)
    private SubCategory subCategory;

    @Column(name = "rating_id")
    private Long ratingId;

    @Column(nullable = false)
    private LocalDateTime dateListed;

    @Column(nullable = false)
    @Min(value = 0, message = "Quantity must be at least 0")
    private int quantity;

    @Column(nullable = false)
    private boolean deleted = false;

    @PrePersist
    protected void onCreate() {
        dateListed = LocalDateTime.now();
    }
}

