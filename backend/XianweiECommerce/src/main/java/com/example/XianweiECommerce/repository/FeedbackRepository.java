package com.example.XianweiECommerce.repository;
import com.example.XianweiECommerce.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByItemId(Long itemId);

    Optional<Feedback> findByItemIdAndUserId(Long itemId, String userId);
}
