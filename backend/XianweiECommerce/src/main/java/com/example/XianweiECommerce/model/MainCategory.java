package com.example.XianweiECommerce.model;
import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;
@Data
@Entity
public class MainCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Getters and setters are inherited from BaseEntity
}
