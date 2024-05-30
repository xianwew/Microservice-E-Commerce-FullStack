package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class CartItemInputDTO {
    private Long id;
    private Long cartId;
    private Long itemId;
    private int quantity;
}