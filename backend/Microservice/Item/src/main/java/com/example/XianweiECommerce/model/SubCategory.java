package com.example.XianweiECommerce.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "sub_categories")
public class SubCategory extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "main_category_id", nullable = false) // Corrected JoinColumn name to match the database
    private MainCategory mainCategory;

    @Column(nullable = false)
    private String name;

    @Column(name = "image_url", nullable = false)
    private String imageUrl; // Added imageUrl field

    // Getters and setters are inherited from BaseEntity
}

