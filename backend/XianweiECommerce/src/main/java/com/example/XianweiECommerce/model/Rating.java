package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Entity
@Table(name = "ratings")
public class Rating extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entity_id", nullable = false)
    private String entityId;

    @Enumerated(EnumType.STRING)
    @Column(name = "entity_type", nullable = false)
    private EntityType entityType;

    @Column(name = "total_rating", nullable = false)
    private int totalRating;

    @Column(name = "num_ratings", nullable = false)
    private int numRatings;

//    @Column(name = "created_at", nullable = false, updatable = false)
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date createdAt;
//
//    @Column(name = "updated_at", nullable = false)
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date updatedAt;

//    @PrePersist
//    protected void onCreate() {
//        createdAt = new Date();
//        updatedAt = new Date();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        updatedAt = new Date();
//    }

    public enum EntityType {
        PRODUCT, SELLER
    }
}
