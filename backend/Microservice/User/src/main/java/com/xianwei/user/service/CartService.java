package com.xianwei.user.service;

import com.example.XianweiECommerce.dto.CartDTO;
import com.example.XianweiECommerce.dto.CartItemInputDTO;
import com.example.XianweiECommerce.dto.CartItemOutputDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;

import com.example.XianweiECommerce.model.Item;

import com.xianwei.user.mapper.CartItemMapper;
import com.xianwei.user.mapper.CartMapper;
import com.xianwei.user.model.Cart;
import com.xianwei.user.model.CartItem;
import com.xianwei.user.model.User;
import com.xianwei.user.repository.CartItemRepository;
import com.xianwei.user.repository.CartRepository;
import com.xianwei.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    private final CartItemMapper cartItemMapper;
    private final RestTemplate restTemplate;

    @Value("${itemservice.url}")
    private String itemServiceUrl;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository, RestTemplate restTemplate, CartItemMapper cartItemMapper) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
        this.cartItemMapper = cartItemMapper;
    }

    public CartDTO createCart(CartDTO cartDTO) {
        Cart cart = CartMapper.toEntity(cartDTO);
        cart = cartRepository.save(cart);
        return CartMapper.toDTO(cart);
    }

    public CartDTO getCart(Long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", id.toString()));
        return CartMapper.toDTO(cart);
    }

    public CartDTO updateCart(CartDTO cartDTO) {
        Cart cart = cartRepository.findById(cartDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartDTO.getId().toString()));

        List<CartItemInputDTO> cartItemInputDTOs = cartDTO.getCartItemsInput().stream()
                .map(itemDTO -> (CartItemInputDTO) itemDTO)
                .collect(Collectors.toList());

        List<CartItem> cartItems = CartItemMapper.toEntityList(cartItemInputDTOs);

        // Clear existing items and add the updated items
        cart.getCartItems().clear();
        for (CartItem cartItem : cartItems) {
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        }

        cart = cartRepository.save(cart);
        return CartMapper.toDTO(cart);
    }

    public void deleteCartByUserId(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        if (user.getCart() != null) {
            user.setCart(null);
            userRepository.save(user);
        }

        Cart cart = (Cart) cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));
        cartRepository.delete(cart);
    }

    public CartDTO ensureCartExists(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        if (user.getCart() == null) {
            Cart cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
            user.setCart(cart);
            userRepository.save(user);
        }
        return CartMapper.toDTO(user.getCart());
    }

    public CartItemOutputDTO addItemToCart(CartItemInputDTO cartItemDTO) {
        Cart cart = cartRepository.findById(cartItemDTO.getCartId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartItemDTO.getCartId().toString()));

        Item item = getItemById(cartItemDTO.getItemId());

        Optional<CartItem> existingCartItem = cart.getCartItems().stream()
                .filter(ci -> ci.getItem().getId().equals(cartItemDTO.getItemId()))
                .findFirst();

        CartItem cartItem;
        if (existingCartItem.isPresent()) {
            cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
        } else {
            cartItem = CartItemMapper.toEntity(cartItemDTO, item);
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        }

        cartItem = cartItemRepository.save(cartItem);
        return CartItemMapper.toOutputDTO(cartItem, item);
    }

    private Item getItemById(Long itemId) {
        String url = String.format("%s/%s", itemServiceUrl, itemId);
        ResponseEntity<Item> itemResponse = restTemplate.getForEntity(url, Item.class);
        Item item = itemResponse.getBody();
        if (item == null) {
            throw new ResourceNotFoundException("Item", "id", itemId.toString());
        }
        return item;
    }
}



