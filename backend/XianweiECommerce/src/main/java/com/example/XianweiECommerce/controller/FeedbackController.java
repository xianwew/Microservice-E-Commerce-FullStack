package com.example.XianweiECommerce.controller;

import com.example.XianweiECommerce.dto.FeedbackDTO;
import com.example.XianweiECommerce.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/item/{itemId}")
    public List<FeedbackDTO> getFeedbacksByItem(@PathVariable Long itemId) {
        return feedbackService.getFeedbacksByItemId(itemId);
    }
}