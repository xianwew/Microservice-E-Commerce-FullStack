package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "carts")
public class Cart extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    // Getters and setters are inherited from BaseEntity
}
