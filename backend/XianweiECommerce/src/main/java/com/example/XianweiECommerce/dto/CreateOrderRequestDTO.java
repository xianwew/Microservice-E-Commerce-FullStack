package com.example.XianweiECommerce.dto;

import lombok.Data;

@Data
public class CreateOrderRequestDTO {
    private Long cartId;
    private Long shippingMethodId;
    private Long cardId;
}
