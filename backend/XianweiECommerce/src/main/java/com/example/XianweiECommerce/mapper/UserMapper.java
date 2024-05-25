package com.example.XianweiECommerce.mapper;
import com.example.XianweiECommerce.dto.UserDTO;
import com.example.XianweiECommerce.model.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setAddress(AddressMapper.toDTO(user.getAddress()));
        userDTO.setRating(RatingMapper.toDTO(user.getRating()));
        return userDTO;
    }

    public static User toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(AddressMapper.toEntity(userDTO.getAddress()));
        user.setRating(RatingMapper.toEntity(userDTO.getRating()));
        return user;
    }

    public static void updateEntityFromDTO(UserDTO userDTO, User user) {
        if (userDTO == null || user == null) {
            return;
        }

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(AddressMapper.toEntity(userDTO.getAddress()));
        user.setRating(RatingMapper.toEntity(userDTO.getRating()));
    }
}



