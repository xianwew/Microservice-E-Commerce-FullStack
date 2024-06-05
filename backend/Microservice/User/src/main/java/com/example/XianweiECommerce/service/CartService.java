package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.config.DataSourceType;
import com.example.XianweiECommerce.config.ReplicationRoutingDataSourceContext;
import com.example.XianweiECommerce.dto.CartDTO;
import com.example.XianweiECommerce.dto.CartItemInputDTO;
import com.example.XianweiECommerce.dto.CartItemOutputDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.CartItemMapper;
import com.example.XianweiECommerce.mapper.CartMapper;
import com.example.XianweiECommerce.model.Cart;
import com.example.XianweiECommerce.model.CartItem;
import com.example.XianweiECommerce.model.User;
import com.example.XianweiECommerce.pojoClass.Item;
import com.example.XianweiECommerce.repository.CartItemRepository;
import com.example.XianweiECommerce.repository.CartRepository;
import com.example.XianweiECommerce.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Value("${itemservice.url}")
    private String itemServiceUrl;

    @Autowired
    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository, RestTemplate restTemplate) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

    public CartDTO createCart(CartDTO cartDTO) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Cart cart = CartMapper.toEntity(cartDTO);
            cart = cartRepository.save(cart);
            return CartMapper.toDTO(cart);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    @Transactional(readOnly = true)
    public CartDTO getCart(Long id) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.SLAVE);
        try {
            Cart cart = cartRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", id.toString()));

            Hibernate.initialize(cart.getCartItems());

            CartDTO cartDTO = CartMapper.toDTO(cart);
            log.info("cart items size: " + cartDTO.getCartItemsOutput().size());
            return cartDTO;
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public CartDTO updateCart(CartDTO cartDTO) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Cart cart = cartRepository.findById(cartDTO.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartDTO.getId().toString()));

            List<CartItemInputDTO> cartItemInputDTOs = cartDTO.getCartItemsInput().stream()
                    .map(itemDTO -> (CartItemInputDTO) itemDTO)
                    .collect(Collectors.toList());

            List<CartItem> cartItems = cartItemInputDTOs.stream()
                    .map(cartItemDTO -> CartItemMapper.toEntity(cartItemDTO))
                    .collect(Collectors.toList());

            // Clear existing items and add the updated items
            cart.getCartItems().clear();
            for (CartItem cartItem : cartItems) {
                cartItem.setCart(cart);
                cart.getCartItems().add(cartItem);
            }

            cart = cartRepository.save(cart);
            return CartMapper.toDTO(cart);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public void deleteCartByUserId(String userId) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
            if (user.getCart() != null) {
                user.setCart(null);
                userRepository.save(user);
            }

            Cart cart = (Cart) cartRepository.findByUserId(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));
            cartRepository.delete(cart);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public CartDTO ensureCartExists(String userId) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
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
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public CartItemOutputDTO addItemToCart(CartItemInputDTO cartItemDTO) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Cart cart = cartRepository.findById(cartItemDTO.getCartId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartItemDTO.getCartId().toString()));

            Optional<CartItem> existingCartItem = cart.getCartItems().stream()
                    .filter(ci -> ci.getItemId().equals(cartItemDTO.getItemId()))
                    .findFirst();

            CartItem cartItem;
            if (existingCartItem.isPresent()) {
                cartItem = existingCartItem.get();
                cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
            } else {
                cartItem = CartItemMapper.toEntity(cartItemDTO);
                cartItem.setCart(cart);
                cart.getCartItems().add(cartItem);
            }

            cartItem = cartItemRepository.save(cartItem);
            return CartItemMapper.toOutputDTO(cartItem);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }

    public void clearCart(Long cartId) {
        ReplicationRoutingDataSourceContext.setDataSourceType(DataSourceType.MASTER);
        try {
            Cart cart = cartRepository.findById(cartId)
                    .orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId.toString()));
            cart.getCartItems().clear();
            cartRepository.save(cart);
        } finally {
            ReplicationRoutingDataSourceContext.clearDataSourceType();
        }
    }
}



