package com.example.XianweiECommerce.dto;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CardDTO {
    private Long id;
    private Long userId;
    private String type;
    private String lastFourDigits;
    private LocalDate expirationDate;
}
