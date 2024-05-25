package com.example.XianweiECommerce.dto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ItemDTO {
    private Long id;
    private Long sellerId;
    private String sellerName;
    private String title;
    private String description;
    private double price;
    private String imageUrl;
    private Long mainCategoryId;
    private String mainCategoryName;
    private Long subCategoryId;
    private String subCategoryName;
    private RatingDTO rating;
    private LocalDateTime dateListed;
}
