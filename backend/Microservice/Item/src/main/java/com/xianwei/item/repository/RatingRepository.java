package com.example.XianweiECommerce.repository;
import com.example.XianweiECommerce.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findByEntityIdAndEntityType(String entityId, Rating.EntityType entityType);
}
