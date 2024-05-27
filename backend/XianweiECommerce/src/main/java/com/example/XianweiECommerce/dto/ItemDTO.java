package com.example.XianweiECommerce.dto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ItemDTO {
    private Long id;
    private String sellerId;
    private String title;
    private String description;
    private double price;
    private String imageUrl;
    private String subImageUrl1;
    private String subImageUrl2;
    private String subImageUrl3;
    private String subImageUrl4;
    private Long mainCategoryId;
    private Long subCategoryId;
    private Long ratingId;
    private LocalDateTime dateListed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // Getters and setters...
}
