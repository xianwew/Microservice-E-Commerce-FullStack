package com.example.XianweiECommerce.pojoClass;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItem {
    private Long id;
    private Long cartId;
    private Long itemId;
    private int quantity;
}