package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.dto.ItemDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.ItemMapper;
import com.example.XianweiECommerce.model.*;
import com.example.XianweiECommerce.repository.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.*;
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

    public void deleteItem(Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(
                () -> new ResourceNotFoundException("Item", "id", itemId.toString())
        );
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
}
