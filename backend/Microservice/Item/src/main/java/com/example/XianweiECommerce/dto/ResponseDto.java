package com.example.XianweiECommerce.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResponseDto implements Serializable {
    private String statusCode;
    private String message;
    private String token;

    public ResponseDto(String statusCode, String message, String token) {
        this.statusCode = statusCode;
        this.message = message;
        this.token = token;
    }

    // Getters and setters
}
