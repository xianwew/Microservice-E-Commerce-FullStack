package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class RatingDTO {
    private Long id;
    private int entityId;
    private String entityType;
    private int totalRating;
    private int numRatings;
}
