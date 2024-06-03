package com.example.XianweiECommerce.dto;
import com.example.XianweiECommerce.annotation.ItemValidInitialQuantity;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@ItemValidInitialQuantity
@Getter
@Setter
public class ItemDTO {
    private Long id;
    private String sellerId;
    private String username; // New field for the seller's username
    private String title;
    @NotBlank(message = "Short description is mandatory")
    private String shortDescription;
    private String longDescription;
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private double price;
    @NotBlank(message = "Image URL is mandatory")
    private String imageUrl;
    private String subImageUrl1;
    private String subImageUrl2;
    private String subImageUrl3;
    private String subImageUrl4;
    @NotBlank(message = "City is mandatory")
    private String city;
    @NotBlank(message = "State is mandatory")
    private String state; // New field
    @NotBlank(message = "Country is mandatory")
    private String country;
    @NotNull(message = "Main category is mandatory")
    private Long mainCategoryId;
    @NotNull(message = "Sub category is mandatory")
    private Long subCategoryId;
    private Long ratingId;
    private LocalDateTime dateListed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @Min(value = 0, message = "Quantity cannot be negative")
    private int quantity;
    private boolean deleted;
}


