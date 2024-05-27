package com.example.XianweiECommerce.repository;
import com.example.XianweiECommerce.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findBySellerId(String userId);

    Optional<Object> findByIdAndSellerId(Long listingId, String userId);
}
