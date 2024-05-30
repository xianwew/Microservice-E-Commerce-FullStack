package com.example.XianweiECommerce.service;

import com.example.XianweiECommerce.dto.OrderDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.mapper.OrderMapper;
import com.example.XianweiECommerce.model.*;
import com.example.XianweiECommerce.repository.CardRepository;
import com.example.XianweiECommerce.repository.CartRepository;
import com.example.XianweiECommerce.repository.OrderRepository;
import com.example.XianweiECommerce.repository.ShippingMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ShippingMethodRepository shippingMethodsRepository;
    private final CardRepository cardRepository;
    private final PaymentService paymentService;
    private final OrderMapper orderMapper;

    @Autowired
    public OrderService(OrderRepository orderRepository, CartRepository cartRepository, ShippingMethodRepository shippingMethodsRepository, CardRepository cardRepository, PaymentService paymentService, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.shippingMethodsRepository = shippingMethodsRepository;
        this.cardRepository = cardRepository;
        this.paymentService = paymentService;
        this.orderMapper = orderMapper;
    }

    public List<ShippingMethod> getShippingMethods() {
        return shippingMethodsRepository.findAll();
    }

    public Optional<OrderDTO> getOrder(Long orderId) {
        return orderRepository.findById(orderId).map(orderMapper::toDTO);
    }

    public Long createOrder(Long cartId, Long shippingMethodId, Long cardId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new ResourceNotFoundException("Cart", "id", cartId.toString()));
        ShippingMethod shippingMethod = shippingMethodsRepository.findById(shippingMethodId).orElseThrow(() -> new ResourceNotFoundException("ShippingMethod", "id", shippingMethodId.toString()));
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new ResourceNotFoundException("Card", "id", cardId.toString()));

        // Simulate payment processing
        boolean paymentSuccessful = paymentService.processPayment(cart);

        if (paymentSuccessful) {
            Order order = new Order();
            order.setUser(cart.getUser());
            order.setTotalAmount(cart.getCartItems().stream().mapToDouble(item -> item.getQuantity() * item.getItem().getPrice()).sum());
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

