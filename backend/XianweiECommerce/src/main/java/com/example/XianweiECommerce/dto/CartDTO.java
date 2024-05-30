package com.example.XianweiECommerce.dto;
import lombok.Data;
import java.util.List;

@Data
public class CartDTO {
    private Long id;
    private String userId;
    private List<CartItemInputDTO> cartItemsInput;
    private List<CartItemOutputDTO> cartItemsOutput;
}
