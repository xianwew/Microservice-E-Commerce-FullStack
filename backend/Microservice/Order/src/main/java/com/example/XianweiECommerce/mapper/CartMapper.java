package com.example.XianweiECommerce.mapper;

import com.example.XianweiECommerce.dto.CartDTO;
import com.example.XianweiECommerce.model.Cart;
import com.example.XianweiECommerce.model.User;
import com.example.XianweiECommerce.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CartMapper {

    public static Cart toEntity(CartDTO cartDTO, ItemRepository itemRepository) {
        Cart cart = new Cart();
        cart.setId(cartDTO.getId());

        User user = new User();
        user.setId(cartDTO.getUserId());
        cart.setUser(user);

        cart.setCartItems(CartItemMapper.toEntityList(cartDTO.getCartItemsInput(), itemRepository));
        return cart;
    }

    public static CartDTO toDTO(Cart cart, ItemRepository itemRepository) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setCartItemsOutput(CartItemMapper.toOutputDTOList(cart.getCartItems(), itemRepository));
        return cartDTO;
    }
}






