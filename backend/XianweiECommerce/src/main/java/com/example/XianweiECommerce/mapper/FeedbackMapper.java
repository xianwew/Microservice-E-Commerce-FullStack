package com.example.XianweiECommerce.mapper;

import com.example.XianweiECommerce.dto.FeedbackDTO;
import com.example.XianweiECommerce.model.Feedback;

public class FeedbackMapper {
    public static FeedbackDTO toDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setItemId(feedback.getItem().getId());
        dto.setUserId(feedback.getUser().getId());
        dto.setUserName(feedback.getUser().getUsername());
        dto.setRating(feedback.getRating());
        dto.setComment(feedback.getComment());
        return dto;
    }
}

