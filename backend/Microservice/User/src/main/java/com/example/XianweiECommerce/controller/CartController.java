package com.example.XianweiECommerce.controller;

import com.example.XianweiECommerce.dto.CartDTO;
import com.example.XianweiECommerce.dto.CartItemInputDTO;
import com.example.XianweiECommerce.dto.CartItemOutputDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.jwt.JwtTokenProvider;
import com.example.XianweiECommerce.pojoClass.Item;
import com.example.XianweiECommerce.service.CartService;
import com.example.XianweiECommerce.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@Slf4j
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final RestTemplate restTemplate;

    @Value("${itemservice.url}")
    private String itemServiceUrl;

    @Autowired
    public CartController(CartService cartService, JwtTokenProvider jwtTokenProvider, UserService userService, RestTemplate restTemplate) {
        this.cartService = cartService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.restTemplate = restTemplate;
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

    @GetMapping("/cartId/{id}")
    public ResponseEntity<CartDTO> getCartById(@PathVariable Long id) {
        CartDTO cart = cartService.getCart(id);
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

        // Query the item service to get the seller ID using the item ID
        String url = String.format("%s/%s", itemServiceUrl, cartItemDTO.getItemId());
        ResponseEntity<Item> itemResponse = restTemplate.getForEntity(url, Item.class);
        Item item = itemResponse.getBody();

        if (item == null) {
            throw new ResourceNotFoundException("Item", "id", cartItemDTO.getItemId().toString());
        }

        String sellerId = item.getSellerId();

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

    @PostMapping("/clear/{cartId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId, @RequestHeader("Authorization") String token) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }
}




