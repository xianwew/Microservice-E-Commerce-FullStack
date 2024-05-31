package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.dto.OrderDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.OrderMapper;
import com.example.XianweiECommerce.model.*;
import com.example.XianweiECommerce.repository.CardRepository;
import com.example.XianweiECommerce.repository.CartRepository;
import com.example.XianweiECommerce.repository.OrderRepository;
import com.example.XianweiECommerce.repository.ShippingMethodRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final CartRepository cartRepository;
    private final ShippingMethodRepository shippingMethodsRepository;
    private final CardRepository cardRepository;
    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;
    private final OrderMapper orderMapper;

    @Value("${payment.service.url}")
    private String paymentServiceUrl;

    public OrderService(CartRepository cartRepository, ShippingMethodRepository shippingMethodsRepository,
                        CardRepository cardRepository, OrderRepository orderRepository, RestTemplate restTemplate, OrderMapper orderMapper) {
        this.cartRepository = cartRepository;
        this.shippingMethodsRepository = shippingMethodsRepository;
        this.cardRepository = cardRepository;
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
        return orderRepository.findByUserId(userId).stream().map(orderMapper::toDTO).collect(Collectors.toList());
    }

    public Long createOrder(Long cartId, Long shippingMethodId, Long cardId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId.toString()));
        ShippingMethod shippingMethod = shippingMethodsRepository.findById(shippingMethodId).orElseThrow(() -> new ResourceNotFoundException("ShippingMethod", "id", shippingMethodId.toString()));
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new ResourceNotFoundException("Card", "id", cardId.toString()));

        // Calculate the total amount
        double itemsTotal = cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getItem().getPrice()).sum();
        double shippingCost = shippingMethod.getPrice();
        double tax = (itemsTotal + shippingCost) * 0.06;
        double totalAmount = itemsTotal + shippingCost + tax;

        // Simulate payment processing
        boolean paymentSuccessful = Boolean.TRUE.equals(restTemplate.postForObject(paymentServiceUrl, totalAmount, Boolean.class));

        if (paymentSuccessful) {
            Order order = new Order();
            order.setUser(cart.getUser());
            order.setTotalAmount(totalAmount);
            order.setStatus("COMPLETED");
            order.setShippingMethod(shippingMethod);
            order.setCardType(card.getType());
            order.setLastFourDigit(card.getCardNumber().substring(card.getCardNumber().length() - 4));

            // Convert CartItems to OrderItems
            List<OrderItem> orderItems = cart.getCartItems().stream()
                    .map(cartItem -> {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setOrder(order);
                        orderItem.setItem(cartItem.getItem());
                        orderItem.setQuantity(cartItem.getQuantity());
                        orderItem.setPrice(cartItem.getItem().getPrice());
                        return orderItem;
                    })
                    .collect(Collectors.toList());
            order.setOrderItems(orderItems);

            Order savedOrder = orderRepository.save(order);
            return savedOrder.getId();
        } else {
            throw new RuntimeException("Payment failed");
        }
    }
}

