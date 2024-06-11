package com.example.XianweiECommerce.service;


import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentService {

    public boolean processPayment(double totalAmount) {
        // Simulate payment processing
        // In a real application, this method would communicate with a payment gateway
        return true;
    }
}