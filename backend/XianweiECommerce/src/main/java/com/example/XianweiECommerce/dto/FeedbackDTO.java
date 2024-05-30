package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class FeedbackDTO {
    private Long id;
    private Long itemId;
    private String userId;
    private String userName;
    private int rating;
    private String comment;
}

