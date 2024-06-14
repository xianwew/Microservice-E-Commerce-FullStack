package com.example.XianweiECommerce.dto;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class MainCategoryDTO implements Serializable {
    private Long id;
    private String name;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    // Getters and setters...
}