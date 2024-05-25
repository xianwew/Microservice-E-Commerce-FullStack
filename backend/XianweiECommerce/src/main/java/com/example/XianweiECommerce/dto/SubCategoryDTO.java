package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class SubCategoryDTO {
    private Long id;
    private Long mainCategoryId;
    private String mainCategoryName;
    private String name;
}

