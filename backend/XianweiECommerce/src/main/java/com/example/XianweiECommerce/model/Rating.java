package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ratings")
public class Rating extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int entityId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EntityType entityType;

    @Column(nullable = false)
    private int totalRating;

    @Column(nullable = false)
    private int numRatings;

    // Enum for entity type
    public enum EntityType {
        PRODUCT, SELLER
    }

    // Getters and setters are inherited from BaseEntity
}

