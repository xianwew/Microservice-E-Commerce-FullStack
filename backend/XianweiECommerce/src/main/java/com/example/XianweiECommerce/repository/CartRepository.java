package com.example.XianweiECommerce.repository;
import com.example.XianweiECommerce.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Object> findByUserId(String userId);
}
