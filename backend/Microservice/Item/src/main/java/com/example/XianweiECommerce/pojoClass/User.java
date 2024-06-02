package com.example.XianweiECommerce.pojoClass;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String addressId;
    private String ratingId;
    private String cartId;
    private String profilePictureUrl;
    private String createdAt;
    private String updatedAt;
}
