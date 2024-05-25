package com.example.XianweiECommerce.service;
import com.example.XianweiECommerce.dto.UserDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.exception.UserAlreadyExistsException;
import com.example.XianweiECommerce.mapper.UserMapper;
import com.example.XianweiECommerce.model.User;
import com.example.XianweiECommerce.repository.AddressRepository;
import com.example.XianweiECommerce.repository.RatingRepository;
import com.example.XianweiECommerce.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.example.XianweiECommerce.service.KeycloakService;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final RatingRepository ratingRepository;
    private final KeycloakService keycloakService;

    @Autowired
    public UserService(UserRepository userRepository, AddressRepository addressRepository, RatingRepository ratingRepository, KeycloakService keycloakService) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.ratingRepository = ratingRepository;
        this.keycloakService = keycloakService;
    }

    public String createUser(UserDTO userDTO) {
        User user = UserMapper.toEntity(userDTO);
        Optional<User> optionalUser = userRepository.findByEmail(userDTO.getEmail());
        if (optionalUser.isPresent()) {
            log.info("User already registered with given email!");
            throw new UserAlreadyExistsException("User already registered with given email: " + userDTO.getEmail());
        }

        // Register user in Keycloak
        String adminToken = keycloakService.getAdminToken();

        keycloakService.createUserInKeycloak(adminToken, userDTO);
        System.out.println("adminToken" + adminToken);
        String token = keycloakService.getUserToken(userDTO.getUsername(), userDTO.getPassword());
        userRepository.save(user);
        log.info("successfully created a user!", user);
        return token;
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User", "email", email)
        );
        return UserMapper.toDTO(user);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id.toString())
        );
        return UserMapper.toDTO(user);
    }

    public boolean updateUser(Long id, UserDTO userDTO) {
        boolean isUpdated = false;
        User existingUser = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id.toString())
        );
        UserMapper.updateEntityFromDTO(userDTO, existingUser);
        if (existingUser.getAddress() != null) {
            addressRepository.save(existingUser.getAddress());
        }
        if (existingUser.getRating() != null) {
            ratingRepository.save(existingUser.getRating());
        }
        userRepository.save(existingUser);
        isUpdated = true;
        return isUpdated;
    }

    public boolean deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id.toString())
        );
        userRepository.deleteById(user.getId());
        return true;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }
}


