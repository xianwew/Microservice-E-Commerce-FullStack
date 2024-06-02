package com.xianwei.user.mapper;

import com.example.XianweiECommerce.dto.CartDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;


import com.xianwei.user.model.Cart;
import com.xianwei.user.model.Item;
import com.xianwei.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CartMapper {

    private static RestTemplate restTemplate;
    private static String itemServiceUrl;

    @Autowired
    public CartMapper(RestTemplate restTemplate, @Value("${itemservice.url}") String itemServiceUrl) {
        CartMapper.restTemplate = restTemplate;
        CartMapper.itemServiceUrl = itemServiceUrl;
    }

    public static Cart toEntity(CartDTO cartDTO) {
        Cart cart = new Cart();
        cart.setId(cartDTO.getId());

        User user = new User();
        user.setId(cartDTO.getUserId());
        cart.setUser(user);

        cart.setCartItems(CartItemMapper.toEntityList(cartDTO.getCartItemsInput()));
        return cart;
    }

    public static CartDTO toDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setCartItemsOutput(CartItemMapper.toOutputDTOList(cart.getCartItems()));
        return cartDTO;
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





