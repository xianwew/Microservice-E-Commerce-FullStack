package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart_items")
public class CartItem extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cartId", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "itemId", nullable = false)
    private Item item;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;

    // Getters and setters are inherited from BaseEntity
}

