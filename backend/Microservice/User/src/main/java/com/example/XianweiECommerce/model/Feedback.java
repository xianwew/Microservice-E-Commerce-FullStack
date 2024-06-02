package com.example.XianweiECommerce.model;
import com.example.XianweiECommerce.pojoClass.Item;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Feedback extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "itemId", nullable = false)
    private Long itemId;

    @Column(name = "sellerId", nullable = false)
    private String sellerId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false)
    private int rating;

    @Lob
    private String comment;

    // Getters and setters are inherited from BaseEntity
}

