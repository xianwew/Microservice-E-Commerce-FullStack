package com.example.XianweiECommerce.service;
import com.example.XianweiECommerce.dto.FeedbackDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.FeedbackMapper;
import com.example.XianweiECommerce.model.Feedback;
import com.example.XianweiECommerce.model.Item;
import com.example.XianweiECommerce.model.Rating;
import com.example.XianweiECommerce.model.User;
import com.example.XianweiECommerce.repository.FeedbackRepository;
import com.example.XianweiECommerce.repository.ItemRepository;
import com.example.XianweiECommerce.repository.RatingRepository;
import com.example.XianweiECommerce.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;
    private final FeedbackMapper feedbackMapper;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository, ItemRepository itemRepository, UserRepository userRepository, RatingRepository ratingRepository, FeedbackMapper feedbackMapper) {
        this.feedbackRepository = feedbackRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.ratingRepository = ratingRepository;
        this.feedbackMapper = feedbackMapper;
    }

    public List<FeedbackDTO> getFeedbacksByItemId(Long itemId) {
        return feedbackRepository.findByItemId(itemId).stream()
                .map(feedbackMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<FeedbackDTO> getFeedbacksByUserId(String userId) {
        return feedbackRepository.findByUserId(userId).stream()
                .map(feedbackMapper::toDTO)
                .collect(Collectors.toList());
    }

    public FeedbackDTO createFeedback(Long itemId, FeedbackDTO feedbackDTO, String userId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId.toString()));

        if (item.getSeller().getId().equals(userId)) {
            throw new InvalidDataAccessApiUsageException("Users cannot comment on their own items");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Check if the user already has feedback for the item
        if (feedbackRepository.existsByItemIdAndUserId(itemId, userId)) {
            throw new IllegalArgumentException("User has already provided feedback for this item");
        }

        Feedback feedback = new Feedback();
        feedback.setItem(item);
        feedback.setUser(user);
        feedback.setRating(feedbackDTO.getRating());
        feedback.setComment(feedbackDTO.getComment());
        Feedback savedFeedback = feedbackRepository.save(feedback);
        updateItemRating(itemId);
        updateUserRating(item.getSeller().getId());

        return feedbackMapper.toDTO(savedFeedback);
    }

    public FeedbackDTO updateFeedback(Long feedbackId, FeedbackDTO feedbackDTO, String userId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", feedbackId.toString()));

        if (!feedback.getUser().getId().equals(userId)) {
            throw new RuntimeException("Users can only update their own feedback");
        }

        feedback.setRating(feedbackDTO.getRating());
        feedback.setComment(feedbackDTO.getComment());
        Feedback updatedFeedback = feedbackRepository.save(feedback);

        updateItemRating(feedback.getItem().getId());
        updateUserRating(feedback.getItem().getSeller().getId());

        return feedbackMapper.toDTO(updatedFeedback);
    }

    public void deleteFeedback(Long feedbackId, String userId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", feedbackId.toString()));

        if (!feedback.getUser().getId().equals(userId)) {
            throw new RuntimeException("Users can only delete their own feedback");
        }

        feedbackRepository.delete(feedback);

        updateItemRating(feedback.getItem().getId());
        updateUserRating(feedback.getItem().getSeller().getId());
    }

    private void updateItemRating(Long itemId) {
        List<Feedback> feedbacks = feedbackRepository.findByItemId(itemId);
        int totalRating = feedbacks.stream().mapToInt(Feedback::getRating).sum();
        int numRatings = feedbacks.size();

        Rating itemRating = ratingRepository.findByEntityIdAndEntityType(itemId.toString(), Rating.EntityType.PRODUCT)
                .orElse(new Rating(itemId.toString(), Rating.EntityType.PRODUCT));

        log.info("totalRating(item): " + totalRating);
        log.info("numRatings(item): " + numRatings);
        itemRating.setTotalRating(totalRating);
        itemRating.setNumRatings(numRatings);

        ratingRepository.save(itemRating);
    }

    private void updateUserRating(String userId) {
        List<Feedback> feedbacks = feedbackRepository.findByItem_Seller_Id(userId);
        int totalRating = feedbacks.stream().mapToInt(Feedback::getRating).sum();
        int numRatings = feedbacks.size();

        Rating userRating = ratingRepository.findByEntityIdAndEntityType(userId, Rating.EntityType.SELLER)
                .orElse(new Rating(userId, Rating.EntityType.SELLER));

        log.info("totalRating(user): " + totalRating);
        log.info("numRatings(user): " + numRatings);
        userRating.setTotalRating(totalRating);
        userRating.setNumRatings(numRatings);

        ratingRepository.save(userRating);
    }
}

