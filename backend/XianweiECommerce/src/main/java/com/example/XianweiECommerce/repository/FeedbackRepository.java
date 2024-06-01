package com.example.XianweiECommerce.repository;
import com.example.XianweiECommerce.model.Feedback;
import org.springframework.beans.PropertyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByItemId(Long itemId);
    List<Feedback> findByUserId(String userId);
    boolean existsByItemIdAndUserId(Long itemId, String userId);

    List<Feedback> findByItem_Seller_Id(String sellerId);

    @Query("SELECT f FROM Feedback f WHERE f.item.seller.id = :sellerId")
    List<Feedback> findBySellerId(@Param("sellerId") String sellerId);
}

