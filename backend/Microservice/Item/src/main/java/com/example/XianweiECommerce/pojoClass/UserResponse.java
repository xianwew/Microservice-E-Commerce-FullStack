package com.example.XianweiECommerce.pojoClass;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private String statusCode;
    private String message;
    private String token;
    private User user;
}