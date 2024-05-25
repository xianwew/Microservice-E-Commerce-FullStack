package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "subcategories")
public class SubCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mainCategoryId", nullable = false)
    private MainCategory mainCategory;

    @Column(nullable = false)
    private String name;

    // Getters and setters are inherited from BaseEntity
}

