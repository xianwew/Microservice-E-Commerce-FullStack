package com.example.XianweiECommerce.dto;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private AddressDTO address;
    private RatingDTO rating;
    private String password;
}


