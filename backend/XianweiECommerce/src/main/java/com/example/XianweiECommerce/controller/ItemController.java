package com.example.XianweiECommerce.controller;

import com.example.XianweiECommerce.dto.ItemDTO;
import com.example.XianweiECommerce.jwt.JwtTokenProvider;
import com.example.XianweiECommerce.service.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Validated
@Slf4j
@RestController
@RequestMapping(path = "/api/item", produces = "application/json")
public class ItemController {

    private final ItemService itemService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public ItemController(ItemService itemService, JwtTokenProvider jwtTokenProvider) {
        this.itemService = itemService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ItemDTO> createItem(@Valid @RequestPart("item") String itemJson,
                                              @RequestPart("imageFile") MultipartFile imageFile,
                                              @RequestPart(value = "subImageFiles", required = false) List<MultipartFile> subImageFiles,
                                              @RequestHeader("Authorization") String token) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemDTO itemDTO = objectMapper.readValue(itemJson, ItemDTO.class);

        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        itemDTO.setSellerId(userId);

        ItemDTO createdItem = itemService.createItem(itemDTO, imageFile, subImageFiles);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }

    @PutMapping(value = "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ItemDTO> updateItem(@Valid @PathVariable Long id, @RequestPart("item") String itemJson,
                                              @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
                                              @RequestPart(value = "subImageFiles", required = false) List<MultipartFile> subImageFiles,
                                              @RequestHeader("Authorization") String token) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemDTO itemDTO = objectMapper.readValue(itemJson, ItemDTO.class);

        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        ItemDTO existingItem = itemService.getItem(id);

        if (!existingItem.getSellerId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ItemDTO updatedItem = itemService.updateItem(id, itemDTO, imageFile, subImageFiles);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id, @RequestHeader("Authorization") String token) throws IOException {
        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        ItemDTO existingItem = itemService.getItem(id);

        if (!existingItem.getSellerId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItem(@PathVariable Long id) {
        ItemDTO itemDTO = itemService.getItem(id);
        return ResponseEntity.ok(itemDTO);
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    
}




