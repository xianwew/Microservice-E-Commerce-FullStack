package com.xianwei.user.mapper;
import com.example.XianweiECommerce.dto.CartItemInputDTO;
import com.example.XianweiECommerce.dto.CartItemOutputDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;

import com.example.XianweiECommerce.model.Item;
import com.xianwei.user.model.Cart;
import com.xianwei.user.model.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Component

public class CartItemMapper {

    private static RestTemplate restTemplate;
    private static String itemServiceUrl;

    @Autowired
    public CartItemMapper(RestTemplate restTemplate, @Value("${itemservice.url}") String itemServiceUrl) {
        CartItemMapper.restTemplate = restTemplate;
        CartItemMapper.itemServiceUrl = itemServiceUrl;
    }

    public static CartItem toEntity(CartItemInputDTO dto, Item item) {
        CartItem entity = new CartItem();
        entity.setId(dto.getId());

        Cart cart = new Cart();
        cart.setId(dto.getCartId());
        entity.setCart(cart);

        entity.setItem(item);
        entity.setQuantity(dto.getQuantity());
        return entity;
    }

    public static CartItemOutputDTO toOutputDTO(CartItem entity, Item item) {
        CartItemOutputDTO dto = new CartItemOutputDTO();
        dto.setId(entity.getId());
        dto.setCartId(entity.getCart().getId());
        dto.setItemId(entity.getItem().getId());
        dto.setQuantity(entity.getQuantity());
        dto.setTitle(item.getTitle());
        dto.setImageUrl(item.getImageUrl());
        dto.setPrice(item.getPrice()); // Query price from item
        return dto;
    }

    public static List<CartItem> toEntityList(List<CartItemInputDTO> dtoList) {
        return dtoList.stream().map(dto -> {
            Item item = getItemById(dto.getItemId());
            return toEntity(dto, item);
        }).collect(Collectors.toList());
    }

    public static List<CartItemOutputDTO> toOutputDTOList(List<CartItem> entityList) {
        return entityList.stream().map(entity -> {
            Item item = getItemById(entity.getItem().getId());
            return toOutputDTO(entity, item);
        }).collect(Collectors.toList());
    }

    private static Item getItemById(Long itemId) {
        String url = String.format("%s/%s", itemServiceUrl, itemId);
        ResponseEntity<Item> itemResponse = restTemplate.getForEntity(url, Item.class);
        Item item = itemResponse.getBody();
        if (item == null) {
            throw new ResourceNotFoundException("Item", "id", itemId.toString());
        }
        return item;
    }
}


