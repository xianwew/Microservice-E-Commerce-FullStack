package com.example.XianweiECommerce.consumer;

import com.example.XianweiECommerce.pojoClass.PaymentRequest;
import com.example.XianweiECommerce.pojoClass.PaymentResult;
import com.example.XianweiECommerce.service.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.retry.backoff.ExponentialBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PaymentConsumer {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "payEvent", groupId = "payment-group")
    public void consume(ConsumerRecord<String, String> record, Acknowledgment acknowledgment) {
        try {
            // Deserialize the payment request
            PaymentRequest paymentRequest = objectMapper.readValue(record.value(), PaymentRequest.class);
            boolean paymentSuccessful = paymentService.processPayment(paymentRequest.getTotalAmount());

            // Create payment result
            PaymentResult paymentResult = new PaymentResult(paymentRequest.getOrderId(), paymentSuccessful, paymentRequest.getCartId(), paymentRequest.getToken());

            // Serialize payment result to JSON
            String paymentResultJson = objectMapper.writeValueAsString(paymentResult);

            // Send payment result to Kafka as a JSON string
            kafkaTemplate.send("paymentResultTopic", paymentResultJson);

            acknowledgment.acknowledge();
            log.info("Payment result sent to Kafka for order ID: " + paymentRequest.getOrderId() + ", success: " + paymentSuccessful);
        } catch (JsonProcessingException e) {
            log.error("Error processing payment request or serializing payment result", e);
        }
    }

    @Bean
    public RetryTemplate retryTemplate() {
        ExponentialBackOffPolicy backOffPolicy = new ExponentialBackOffPolicy();
        backOffPolicy.setInitialInterval(1000);
        backOffPolicy.setMultiplier(2);
        backOffPolicy.setMaxInterval(10000);

        RetryTemplate retryTemplate = new RetryTemplate();
        retryTemplate.setRetryPolicy(new SimpleRetryPolicy(3));
        retryTemplate.setBackOffPolicy(backOffPolicy);
        return retryTemplate;
    }
}
