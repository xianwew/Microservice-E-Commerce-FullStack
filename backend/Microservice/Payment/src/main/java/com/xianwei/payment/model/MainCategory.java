package com.example.XianweiECommerce.model;
import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "main_categories")
public class MainCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Getters and setters are inherited from BaseEntity
}
