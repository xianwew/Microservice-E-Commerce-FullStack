package com.example.XianweiECommerce.controller;

import com.example.XianweiECommerce.dto.CartDTO;
import com.example.XianweiECommerce.dto.CartItemInputDTO;
import com.example.XianweiECommerce.dto.CartItemOutputDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.jwt.JwtTokenProvider;
import com.example.XianweiECommerce.model.Item;
import com.example.XianweiECommerce.repository.ItemRepository;
import com.example.XianweiECommerce.service.CartService;
import com.example.XianweiECommerce.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final ItemRepository itemRepository;

    @Autowired
    public CartController(CartService cartService, JwtTokenProvider jwtTokenProvider, UserService userService, ItemRepository itemRepository) {
        this.cartService = cartService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.itemRepository = itemRepository;
    }

    @PostMapping
    public ResponseEntity<CartDTO> createCart(@RequestBody CartDTO cartDTO, @RequestHeader("Authorization") String token) {
        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        cartDTO.setUserId(userId);
        CartDTO createdCart = cartService.createCart(cartDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getCart(@PathVariable String userId, @RequestHeader("Authorization") String token) {
        String tokenUserId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        CartDTO cart = cartService.ensureCartExists(userId);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<CartDTO> updateCart(@PathVariable String userId, @RequestBody CartDTO cartDTO, @RequestHeader("Authorization") String token) {
        String tokenUserId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        log.info("cartDTO id: " + cartDTO.getId());
        CartDTO updatedCart = cartService.updateCart(cartDTO);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteCart(@PathVariable String userId, @RequestHeader("Authorization") String token) {
        String tokenUserId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));
        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        cartService.deleteCartByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/items")
    public ResponseEntity<CartItemOutputDTO> addItemToCart(@RequestBody CartItemInputDTO cartItemDTO, @RequestHeader("Authorization") String token) {
        String userId = jwtTokenProvider.extractUserIdFromToken(token.replace("Bearer ", ""));

        // Query the item table to get the seller ID using the item ID
        Item item = itemRepository.findById(cartItemDTO.getItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", cartItemDTO.getItemId().toString()));
        String sellerId = item.getSeller().getId();

        // Compare the seller ID with the extracted user ID
        if (userId.equals(sellerId)) {
            throw new InvalidDataAccessApiUsageException("You cannot add your own product to your cart");
        }

        CartDTO cartDTO = cartService.ensureCartExists(userId);
        cartItemDTO.setCartId(cartDTO.getId());

        if (cartItemDTO.getCartId() == null) {
            throw new InvalidDataAccessApiUsageException("Cart id must not be null");
        }

        CartItemOutputDTO createdCartItem = cartService.addItemToCart(cartItemDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCartItem);
    }
}




