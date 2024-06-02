package com.example.XianweiECommerce.mapper;

import com.example.XianweiECommerce.dto.FeedbackDTO;
import com.example.XianweiECommerce.model.Feedback;
import com.example.XianweiECommerce.model.User;
import com.example.XianweiECommerce.pojoClass.Item;
import org.springframework.stereotype.Component;

@Component
public class FeedbackMapper {

    public FeedbackDTO toDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setItemId(feedback.getItemId());
        dto.setUserId(feedback.getUser().getId());
        dto.setUserName(feedback.getUser().getUsername());
        dto.setRating(feedback.getRating());
        dto.setComment(feedback.getComment());
        dto.setCreatedAt(feedback.getCreatedAt());
        dto.setUpdatedAt(feedback.getUpdatedAt());
        return dto;
    }

    public Feedback toEntity(FeedbackDTO dto, User user, String sellerId) {
        Feedback feedback = new Feedback();
        feedback.setItemId(dto.getItemId());
        feedback.setSellerId(sellerId);
        feedback.setUser(user);
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        return feedback;
    }
}

