package com.example.XianweiECommerce.model;
import com.example.XianweiECommerce.pojoClass.Item;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cart_items")
public class CartItem extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cartId", nullable = false)
    private Cart cart;

    @Column(name = "itemId", nullable = false)
    private Long itemId;

    @Column(nullable = false)
    private int quantity;
}

