package com.example.XianweiECommerce.dto;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class SubCategoryDTO {
    private Long id;
    private Long mainCategoryId;
    private String mainCategoryName;
    private String name;
    private String imageUrl; // Added imageUrl field
    private Timestamp createdAt;
    private Timestamp updatedAt;
}

