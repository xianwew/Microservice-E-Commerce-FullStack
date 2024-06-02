package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class ShippingMethodDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String estimatedDeliveryTime;
}
