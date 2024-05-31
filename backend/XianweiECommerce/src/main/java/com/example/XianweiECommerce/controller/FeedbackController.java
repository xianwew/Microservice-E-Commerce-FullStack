package com.example.XianweiECommerce.controller;

import com.example.XianweiECommerce.dto.FeedbackDTO;
import com.example.XianweiECommerce.jwt.JwtTokenProvider;
import com.example.XianweiECommerce.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public FeedbackController(FeedbackService feedbackService, JwtTokenProvider jwtTokenProvider) {
        this.feedbackService = feedbackService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/item/{itemId}")
    public List<FeedbackDTO> getFeedbacksByItem(@PathVariable Long itemId) {
        return feedbackService.getFeedbacksByItemId(itemId);
    }

    @PostMapping("/item/{itemId}")
    public ResponseEntity<FeedbackDTO> postFeedback(@PathVariable Long itemId, @RequestBody FeedbackDTO feedbackDTO, @RequestHeader("Authorization") String token) {
        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        FeedbackDTO createdFeedback = feedbackService.createFeedback(itemId, feedbackDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFeedback);
    }

    @PutMapping("/{feedbackId}")
    public ResponseEntity<FeedbackDTO> updateFeedback(@PathVariable Long feedbackId, @RequestBody FeedbackDTO feedbackDTO, @RequestHeader("Authorization") String token) {
        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        FeedbackDTO updatedFeedback = feedbackService.updateFeedback(feedbackId, feedbackDTO, userId);
        return ResponseEntity.ok(updatedFeedback);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long feedbackId, @RequestHeader("Authorization") String token) {
        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        feedbackService.deleteFeedback(feedbackId, userId);
        return ResponseEntity.noContent().build();
    }
}
