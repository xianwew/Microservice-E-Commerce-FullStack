package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.dto.ItemDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.ItemMapper;
import com.example.XianweiECommerce.model.*;
import com.example.XianweiECommerce.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final MainCategoryRepository mainCategoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final RatingRepository ratingRepository;
    private final CloudinaryService cloudinaryService;

    @Value("${cloudinary.item-upload-folder}")
    private String imageFolder;

    @Autowired
    public ItemService(ItemRepository itemRepository,
                       UserRepository userRepository,
                       MainCategoryRepository mainCategoryRepository,
                       SubCategoryRepository subCategoryRepository,
                       RatingRepository ratingRepository,
                       CloudinaryService cloudinaryService) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.mainCategoryRepository = mainCategoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.ratingRepository = ratingRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public ItemDTO createItem(ItemDTO itemDTO, MultipartFile imageFile, List<MultipartFile> subImageFiles) throws IOException {
        log.info("saving new listing!");
        User seller = userRepository.findById(itemDTO.getSellerId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", itemDTO.getSellerId())
        );
        MainCategory mainCategory = mainCategoryRepository.findById(itemDTO.getMainCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("MainCategory", "id", itemDTO.getMainCategoryId().toString())
        );
        SubCategory subCategory = subCategoryRepository.findById(itemDTO.getSubCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("SubCategory", "id", itemDTO.getSubCategoryId().toString())
        );
        Rating rating = itemDTO.getRatingId() != null ?
                ratingRepository.findById(itemDTO.getRatingId()).orElse(null) : null;

        if(itemDTO.getQuantity() <= 0){
            throw new RuntimeException("Quantity should be greater than 0!");
        }

        Item item = ItemMapper.toEntity(itemDTO, seller, mainCategory, subCategory, rating);

        if (imageFile != null && !imageFile.isEmpty()) {
            Map<String, Object> uploadResult = cloudinaryService.uploadFile(imageFile.getBytes(), imageFolder);
            item.setImageUrl((String) uploadResult.get("url"));
        }

        if (subImageFiles != null && !subImageFiles.isEmpty()) {
            if (subImageFiles.size() > 0) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(0).getBytes(), imageFolder);
                item.setSubImageUrl1((String) uploadResult.get("url"));
            }
            if (subImageFiles.size() > 1) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(1).getBytes(), imageFolder);
                item.setSubImageUrl2((String) uploadResult.get("url"));
            }
            if (subImageFiles.size() > 2) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(2).getBytes(), imageFolder);
                item.setSubImageUrl3((String) uploadResult.get("url"));
            }
            if (subImageFiles.size() > 3) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(3).getBytes(), imageFolder);
                item.setSubImageUrl4((String) uploadResult.get("url"));
            }
        }

        Item savedItem = itemRepository.save(item);
        log.info("listing saved");
        return ItemMapper.toDTO(savedItem);
    }

    public ItemDTO updateItem(Long itemId, ItemDTO itemDTO, MultipartFile imageFile, List<MultipartFile> subImageFiles) throws IOException {
        Item existingItem = itemRepository.findById(itemId).orElseThrow(
                () -> new ResourceNotFoundException("Item", "id", itemId.toString())
        );
        MainCategory mainCategory = mainCategoryRepository.findById(itemDTO.getMainCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("MainCategory", "id", itemDTO.getMainCategoryId().toString())
        );
        SubCategory subCategory = subCategoryRepository.findById(itemDTO.getSubCategoryId()).orElseThrow(
                () -> new ResourceNotFoundException("SubCategory", "id", itemDTO.getSubCategoryId().toString())
        );
        Rating rating = itemDTO.getRatingId() != null ?
                ratingRepository.findById(itemDTO.getRatingId()).orElse(null) : null;

        ItemMapper.updateEntityFromDTO(itemDTO, existingItem, mainCategory, subCategory, rating);

        if (imageFile != null && !imageFile.isEmpty()) {
            if (existingItem.getImageUrl() != null && !existingItem.getImageUrl().isEmpty()) {
                String publicId = cloudinaryService.extractPublicIdFromUrl(existingItem.getImageUrl());
                cloudinaryService.deleteFile(publicId, imageFolder);
            }
            Map<String, Object> uploadResult = cloudinaryService.uploadFile(imageFile.getBytes(), imageFolder);
            existingItem.setImageUrl((String) uploadResult.get("url"));
        } else if (existingItem.getImageUrl() == null || existingItem.getImageUrl().isEmpty()) {
            throw new IllegalArgumentException("Cover image is required.");
        }

        if (subImageFiles != null && !subImageFiles.isEmpty()) {
            if (subImageFiles.size() > 0) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(0).getBytes(), imageFolder);
                existingItem.setSubImageUrl1((String) uploadResult.get("url"));
            }
            if (subImageFiles.size() > 1) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(1).getBytes(), imageFolder);
                existingItem.setSubImageUrl2((String) uploadResult.get("url"));
            }
            if (subImageFiles.size() > 2) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(2).getBytes(), imageFolder);
                existingItem.setSubImageUrl3((String) uploadResult.get("url"));
            }
            if (subImageFiles.size() > 3) {
                Map<String, Object> uploadResult = cloudinaryService.uploadFile(subImageFiles.get(3).getBytes(), imageFolder);
                existingItem.setSubImageUrl4((String) uploadResult.get("url"));
            }
        }

        Item updatedItem = itemRepository.save(existingItem);
        return ItemMapper.toDTO(updatedItem);
    }

    public void deleteItem(Long itemId) throws IOException {
        Item item = itemRepository.findById(itemId).orElseThrow(
                () -> new ResourceNotFoundException("Item", "id", itemId.toString())
        );

        // Delete the cover image from Cloudinary
        if (item.getImageUrl() != null && !item.getImageUrl().isEmpty()) {
            String publicId = cloudinaryService.extractPublicIdFromUrl(item.getImageUrl());
            cloudinaryService.deleteFile(publicId, imageFolder);
        }

        // Delete the additional images from Cloudinary
        if (item.getSubImageUrl1() != null && !item.getSubImageUrl1().isEmpty()) {
            String publicId1 = cloudinaryService.extractPublicIdFromUrl(item.getSubImageUrl1());
            cloudinaryService.deleteFile(publicId1, imageFolder);
        }
        if (item.getSubImageUrl2() != null && !item.getSubImageUrl2().isEmpty()) {
            String publicId2 = cloudinaryService.extractPublicIdFromUrl(item.getSubImageUrl2());
            cloudinaryService.deleteFile(publicId2, imageFolder);
        }
        if (item.getSubImageUrl3() != null && !item.getSubImageUrl3().isEmpty()) {
            String publicId3 = cloudinaryService.extractPublicIdFromUrl(item.getSubImageUrl3());
            cloudinaryService.deleteFile(publicId3, imageFolder);
        }
        if (item.getSubImageUrl4() != null && !item.getSubImageUrl4().isEmpty()) {
            String publicId4 = cloudinaryService.extractPublicIdFromUrl(item.getSubImageUrl4());
            cloudinaryService.deleteFile(publicId4, imageFolder);
        }

        // Delete the item from the repository
        itemRepository.delete(item);
    }

    public ItemDTO getItem(Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(
                () -> new ResourceNotFoundException("Item", "id", itemId.toString())
        );
        return ItemMapper.toDTO(item);
    }

    public List<ItemDTO> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(ItemMapper::toDTO).collect(Collectors.toList());
    }

    public ItemService(ItemRepository itemRepository, UserRepository userRepository, RatingRepository ratingRepository, MainCategoryRepository mainCategoryRepository, SubCategoryRepository subCategoryRepository, CloudinaryService cloudinaryService) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.ratingRepository = ratingRepository;
        this.mainCategoryRepository = mainCategoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<ItemDTO> searchItems(String query, String country, String state, Double minPrice, Double maxPrice, Long mainCategoryId, Long subCategoryId) {
        Specification<Item> spec = Specification.where(null);
        boolean hasCriteria = false;

        log.info("Starting search with parameters: query={}, country={}, state={}, minPrice={}, maxPrice={}, mainCategoryId={}, subCategoryId={}",
                query, country, state, minPrice, maxPrice, mainCategoryId, subCategoryId);

        if (query != null && !query.isEmpty()) {
            hasCriteria = true;
            spec = spec.and((root, criteriaQuery, criteriaBuilder) -> {
                String pattern = "%" + query + "%";
                return criteriaBuilder.or(
                        criteriaBuilder.like(root.get("title"), pattern),
                        criteriaBuilder.like(root.get("mainCategory").get("name"), pattern),
                        criteriaBuilder.like(root.get("subCategory").get("name"), pattern)
                );
            });
            log.info("Added query criteria");
        }
        if (country != null && !country.isEmpty()) {
            hasCriteria = true;
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("country"), country));
            log.info("Added country criteria");
        }
        if (state != null && !state.isEmpty()) {
            hasCriteria = true;
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("state"), state));
            log.info("Added state criteria");
        }
        if (minPrice != null) {
            hasCriteria = true;
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            log.info("Added minPrice criteria");
        }
        if (maxPrice != null) {
            hasCriteria = true;
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            log.info("Added maxPrice criteria");
        }
        if (mainCategoryId != null) {
            hasCriteria = true;
            List<Long> subCategoryIds = subCategoryRepository.findByMainCategoryId(mainCategoryId).stream()
                    .map(SubCategory::getId)
                    .collect(Collectors.toList());
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.or(
                            criteriaBuilder.equal(root.get("mainCategory").get("id"), mainCategoryId),
                            root.get("subCategory").get("id").in(subCategoryIds)
                    ));
            log.info("Added mainCategoryId criteria with subcategories: {}", subCategoryIds);
        }
        if (subCategoryId != null) {
            hasCriteria = true;
            spec = spec.and((root, criteriaQuery, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("subCategory").get("id"), subCategoryId));
            log.info("Added subCategoryId criteria");
        }

        if (!hasCriteria) {
            log.info("No search criteria provided, fetching all items");
            return itemRepository.findAll().stream().map(item -> {
                ItemDTO itemDTO = ItemMapper.toDTO(item);
                User seller = userRepository.findById(item.getSeller().getId()).orElse(null);
                if (seller != null) {
                    itemDTO.setUsername(seller.getUsername());
                    Rating rating = ratingRepository.findByEntityIdAndEntityType(seller.getId(), Rating.EntityType.SELLER)
                            .orElse(null);
                    if (rating != null) {
                        itemDTO.setTotalRating(rating.getTotalRating());
                        itemDTO.setNumRatings(rating.getNumRatings());
                    } else {
                        itemDTO.setTotalRating(0);
                        itemDTO.setNumRatings(0);
                    }
                }
                return itemDTO;
            }).collect(Collectors.toList());
        }

        List<Item> items = itemRepository.findAll(spec);
        log.info("Found {} items matching criteria", items.size());

        return items.stream().map(item -> {
            ItemDTO itemDTO = ItemMapper.toDTO(item);
            User seller = userRepository.findById(item.getSeller().getId()).orElse(null);
            if (seller != null) {
                itemDTO.setUsername(seller.getUsername());
                Rating rating = ratingRepository.findByEntityIdAndEntityType(seller.getId(), Rating.EntityType.SELLER)
                        .orElse(null);
                if (rating != null) {
                    itemDTO.setTotalRating(rating.getTotalRating());
                    itemDTO.setNumRatings(rating.getNumRatings());
                } else {
                    itemDTO.setTotalRating(0);
                    itemDTO.setNumRatings(0);
                }
            }
            return itemDTO;
        }).collect(Collectors.toList());
    }

}

