package com.example.XianweiECommerce.controller;


import com.example.XianweiECommerce.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<Boolean> processPayment(@RequestBody double totalAmount) {
        boolean paymentSuccessful = paymentService.processPayment(totalAmount);
        return ResponseEntity.ok(paymentSuccessful);
    }
}

