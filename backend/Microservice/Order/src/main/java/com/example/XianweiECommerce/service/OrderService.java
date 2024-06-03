package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.dto.OrderDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.OrderMapper;
import com.example.XianweiECommerce.model.*;
import com.example.XianweiECommerce.pojoClass.Card;
import com.example.XianweiECommerce.pojoClass.Cart;
import com.example.XianweiECommerce.pojoClass.Item;
import com.example.XianweiECommerce.repository.OrderRepository;
import com.example.XianweiECommerce.repository.ShippingMethodRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    private final ShippingMethodRepository shippingMethodsRepository;
    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;
    private final OrderMapper orderMapper;

    @Value("${payment.service.url}")
    private String paymentServiceUrl;

    @Value("${userservice.url}")
    private String userServiceUrl;

    @Value("${itemservice.url}")
    private String itemServiceUrl;

    @Value("${cartservice.url}")
    private String cartServiceUrl;

    @Autowired
    public OrderService(ShippingMethodRepository shippingMethodsRepository, OrderRepository orderRepository,
                        RestTemplate restTemplate, OrderMapper orderMapper) {
        this.shippingMethodsRepository = shippingMethodsRepository;
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
        this.orderMapper = orderMapper;
    }

    public List<ShippingMethod> getShippingMethods() {
        return shippingMethodsRepository.findAll();
    }

    public Optional<OrderDTO> getOrder(Long orderId) {
        return orderRepository.findById(orderId).map(orderMapper::toDTO);
    }

    public List<OrderDTO> getOrdersByUser(String userId) {
        log.info("getting uer order!");
        return orderRepository.findByUserId(userId).stream().map(orderMapper::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public Long createOrder(Long cartId, Long shippingMethodId, Long cardId, String token) {
        Cart cart = getCartById(cartId, token);
        ShippingMethod shippingMethod = shippingMethodsRepository.findById(shippingMethodId)
                .orElseThrow(() -> new ResourceNotFoundException("ShippingMethod", "id", shippingMethodId.toString()));
        Card card = getCardById(cardId, token);

        log.info("order items length: ", cart.getCartItemsOutput().size());
        // Calculate the total amount
        double itemsTotal = cart.getCartItemsOutput().stream()
                .mapToDouble(cartItem -> {
                    Item item = getItemById(cartItem.getItemId(), token);
                    log.info("Getting order item by id! " + item.getId());
                    return cartItem.getQuantity() * item.getPrice();
                })
                .sum();
        double shippingCost = shippingMethod.getPrice();
        double tax = (itemsTotal + shippingCost) * 0.06;
        double totalAmount = itemsTotal + shippingCost + tax;

        // Simulate payment processing
        boolean paymentSuccessful = Boolean.TRUE.equals(
                restTemplate.postForObject(paymentServiceUrl, totalAmount, Boolean.class)
        );

        if (paymentSuccessful) {
            log.info("Payment successful!");
            Order order = new Order();
            order.setUserId(cart.getUserId());
            order.setTotalAmount(totalAmount);
            order.setStatus("COMPLETED");
            order.setShippingMethod(shippingMethod);
            order.setCardType(card.getType());
            order.setLastFourDigit(card.getCardNumber().substring(card.getCardNumber().length() - 4));

            // Convert CartItems to OrderItems
            List<OrderItem> orderItems = cart.getCartItemsOutput().stream()
                    .map(cartItem -> {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setOrder(order);
                        orderItem.setItemId(cartItem.getItemId());
                        orderItem.setQuantity(cartItem.getQuantity());
                        Item item = getItemById(cartItem.getItemId(), token);
                        orderItem.setPrice(item.getPrice());
                        return orderItem;
                    })
                    .collect(Collectors.toList());
            order.setOrderItems(orderItems);

            Order savedOrder = orderRepository.save(order);

            // Clear the cart after the order is successfully created
            clearCart(cartId, token);

            return savedOrder.getId();
        } else {
            throw new RuntimeException("Payment failed");
        }
    }

    private Cart getCartById(Long cartId, String token) {
        String url = String.format("%s/cartId/%s", cartServiceUrl, cartId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Cart> cartResponse = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Cart.class);
        Cart cart = cartResponse.getBody();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart", "id", cartId.toString());
        }
//        if (cart.getCartItemsOutput() == null) {
//            cart.getCartItemsOutput(new ArrayList<>());
//            throw new RuntimeException("No cart items found!");
//        }
        return cart;
    }

    private Card getCardById(Long cardId, String token) {
        String url = String.format("%s/card/%s", userServiceUrl, cardId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Card> cardResponse = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Card.class);
        Card card = cardResponse.getBody();
        if (card == null) {
            throw new ResourceNotFoundException("Card", "id", cardId.toString());
        }
        return card;
    }

    private Item getItemById(Long itemId, String token) {
        String url = String.format("%s/%s", itemServiceUrl, itemId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Item> itemResponse = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Item.class);
        Item item = itemResponse.getBody();
        if (item == null) {
            throw new ResourceNotFoundException("Item", "id", itemId.toString());
        }
        log.info("order item id: " + item.getId());
        return item;
    }

    private void clearCart(Long cartId, String token) {
        String url = String.format("%s/clear/%s", cartServiceUrl, cartId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        restTemplate.exchange(url, HttpMethod.POST, requestEntity, Void.class);
    }
}

