package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private String profilePictureUrl;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private AddressDTO address;
    private RatingDTO rating;
    private String password;
    private Long cartId; // New field for cartId
    
}



