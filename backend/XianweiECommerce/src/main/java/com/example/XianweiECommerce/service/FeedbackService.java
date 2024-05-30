package com.example.XianweiECommerce.service;
import com.example.XianweiECommerce.dto.FeedbackDTO;
import com.example.XianweiECommerce.mapper.FeedbackMapper;
import com.example.XianweiECommerce.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<FeedbackDTO> getFeedbacksByItemId(Long itemId) {
        return feedbackRepository.findByItemId(itemId).stream()
                .map(FeedbackMapper::toDTO)
                .collect(Collectors.toList());
    }
}
