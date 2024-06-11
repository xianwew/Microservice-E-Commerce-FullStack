package com.example.XianweiECommerce.consumer;

import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.model.Order;
import com.example.XianweiECommerce.pojoClass.*;
import com.example.XianweiECommerce.repository.OrderRepository;
import com.example.XianweiECommerce.repository.ShippingMethodRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderConsumer {

    @Value("${userservice.url}")
    private String userServiceUrl;

    @Value("${cartservice.url}")
    private String cartServiceUrl;

    @Value("${itemservice.url}")
    private String itemServiceUrl;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ShippingMethodRepository shippingMethodRepository;

    @KafkaListener(topics = "paymentResultTopic", groupId = "order-group")
    @Transactional
    public void handlePaymentResult(ConsumerRecord<String, String> record, Acknowledgment acknowledgment) {
        try {
            PaymentResult paymentResult = objectMapper.readValue(record.value(), PaymentResult.class);
            Order order = orderRepository.findById(paymentResult.getOrderId())
                    .orElseThrow(() -> new ResourceNotFoundException("Order", "id", paymentResult.getOrderId().toString()));
            order.setStatus(paymentResult.isPaymentSuccessful() ? "COMPLETED" : "FAILED");
            orderRepository.save(order);

            // Clear the cart after processing payment
            clearCart(paymentResult.getCartId(), paymentResult.getToken());

            acknowledgment.acknowledge();
            log.info("Order status updated for order ID: " + paymentResult.getOrderId() + ", status: " + order.getStatus());
        } catch (JsonProcessingException e) {
            log.error("Error deserializing payment result message", e);
        } catch (Exception e) {
            log.error("Exception in handlePaymentResult", e);
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
        return cart;
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
        log.info("Order item id: " + item.getId());
        return item;
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

    private void clearCart(Long cartId, String token) {
        String url = String.format("%s/clear/%s", cartServiceUrl, cartId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        restTemplate.exchange(url, HttpMethod.POST, requestEntity, Void.class);
        log.info("Cart cleared for cart ID: " + cartId);
    }
}