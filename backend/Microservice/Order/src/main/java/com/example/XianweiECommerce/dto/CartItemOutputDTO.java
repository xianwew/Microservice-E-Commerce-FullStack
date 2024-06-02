package com.example.XianweiECommerce.dto;

import lombok.Data;

@Data
public class CartItemOutputDTO {
    private Long id;
    private Long cartId;
    private Long itemId;
    private int quantity;
    private String title;
    private String imageUrl;
    private double price;
}