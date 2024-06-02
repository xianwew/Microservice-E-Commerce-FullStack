package com.xianwei.user.mapper;

import com.example.XianweiECommerce.dto.FeedbackDTO;

import com.xianwei.user.model.Feedback;
import com.xianwei.user.model.Item;
import com.xianwei.user.model.User;
import org.springframework.stereotype.Component;

@Component
public class FeedbackMapper {

    public FeedbackDTO toDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setItemId(feedback.getItem().getId());
        dto.setUserId(feedback.getUser().getId());
        dto.setUserName(feedback.getUser().getUsername());
        dto.setRating(feedback.getRating());
        dto.setComment(feedback.getComment());
        dto.setCreatedAt(feedback.getCreatedAt());
        dto.setUpdatedAt(feedback.getUpdatedAt());
        return dto;
    }

    public Feedback toEntity(FeedbackDTO dto, User user, Item item) {
        Feedback feedback = new Feedback();
        feedback.setItem(item);
        feedback.setUser(user);
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        return feedback;
    }
}


