package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.config.DataSourceType;
import com.example.XianweiECommerce.config.ReplicationRoutingDataSourceContext;
import com.example.XianweiECommerce.dto.RatingDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.model.Rating;
import com.example.XianweiECommerce.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public RatingDTO getRatingById(Long id) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.SLAVE);
        try {
            Rating rating = ratingRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Rating", "id", id.toString()));
            return toDTO(rating);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public RatingDTO getRatingByEntityIdAndType(String entityId, String entityType) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.SLAVE);
        try {
            Rating rating = ratingRepository.findByEntityIdAndEntityType(entityId, Rating.EntityType.valueOf(entityType))
                    .orElseThrow(() -> new ResourceNotFoundException("Rating", "entityId and entityType", entityId + " " + entityType));
            return toDTO(rating);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public RatingDTO createRating(RatingDTO ratingDTO) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Rating rating = toEntity(ratingDTO);
            Rating savedRating = ratingRepository.save(rating);
            return toDTO(savedRating);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public RatingDTO updateRating(Long id, RatingDTO ratingDTO) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Rating existingRating = ratingRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Rating", "id", id.toString()));

            existingRating.setTotalRating(ratingDTO.getTotalRating());
            existingRating.setNumRatings(ratingDTO.getNumRatings());

            Rating updatedRating = ratingRepository.save(existingRating);
            return toDTO(updatedRating);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public void deleteRating(Long id) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Rating rating = ratingRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Rating", "id", id.toString()));
            ratingRepository.delete(rating);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    private RatingDTO toDTO(Rating rating) {
        RatingDTO dto = new RatingDTO();
        dto.setId(rating.getId());
        dto.setEntityId(rating.getEntityId());
        dto.setEntityType(rating.getEntityType().name());
        dto.setTotalRating(rating.getTotalRating());
        dto.setNumRatings(rating.getNumRatings());
        return dto;
    }

    private Rating toEntity(RatingDTO dto) {
        Rating rating = new Rating();
        rating.setEntityId(dto.getEntityId());
        rating.setEntityType(Rating.EntityType.valueOf(dto.getEntityType()));
        rating.setTotalRating(dto.getTotalRating());
        rating.setNumRatings(dto.getNumRatings());
        return rating;
    }
}