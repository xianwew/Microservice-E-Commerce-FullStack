package com.example.XianweiECommerce.pojoClass;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Cart {
    private Long id;
    private String userId;
    private List<CartItem> cartItems;
}