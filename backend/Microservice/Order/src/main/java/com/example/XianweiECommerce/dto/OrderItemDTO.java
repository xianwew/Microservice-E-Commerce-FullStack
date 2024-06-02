package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private Long orderId;
    private Long itemId;
    private String itemName;
    private int quantity;
    private double price;
}

