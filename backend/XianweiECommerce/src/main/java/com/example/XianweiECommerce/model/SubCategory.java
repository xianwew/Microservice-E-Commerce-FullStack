package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sub_categories")
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

