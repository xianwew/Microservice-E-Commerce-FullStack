package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private Long cartId;
    private Long itemId;
    private String itemName;
    private int quantity;
    private double price;
}
