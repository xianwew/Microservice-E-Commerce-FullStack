package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private double totalAmount;

    @Column(nullable = false)
    private String status;

    // Getters and setters are inherited from BaseEntity
}

