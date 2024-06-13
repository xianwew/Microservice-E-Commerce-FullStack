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

import java.util.concurrent.ExecutionException;

@Service
@Slf4j
public class PaymentConsumer {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "payEvent", groupId = "payment-group", containerFactory = "kafkaListenerContainerFactory")
    public void consume(ConsumerRecord<String, String> record, Acknowledgment acknowledgment) {
        try {
            PaymentRequest paymentRequest = objectMapper.readValue(record.value(), PaymentRequest.class);
            boolean paymentSuccessful = paymentService.processPayment(paymentRequest.getTotalAmount());
            PaymentResult paymentResult = new PaymentResult(paymentRequest.getOrderId(), paymentSuccessful, paymentRequest.getCartId(), paymentRequest.getToken());
            String paymentResultJson = objectMapper.writeValueAsString(paymentResult);
            sendWithRetry("paymentResultTopic", paymentResultJson);
            acknowledgment.acknowledge();
            log.info("Payment result sent to Kafka for order ID: " + paymentRequest.getOrderId() + ", success: " + paymentSuccessful);
        }
        catch (JsonProcessingException e) {
            log.error("Error processing payment request or serializing payment result", e);
        }
    }

    private void sendWithRetry(String topic, String message) {
        int retryCount = 0;
        int maxRetries = 5;
        while (retryCount < maxRetries) {
            try {
                kafkaTemplate.send(topic, message).get();
                return;
            }
            catch (InterruptedException | ExecutionException e) {
                retryCount++;
                log.error("Error sending payment result to Kafka, attempt: " + retryCount, e);
                try {
                    Thread.sleep(1000 * retryCount);
                }
                catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        log.error("Failed to send payment result to Kafka after " + maxRetries + " attempts");
    }
}



