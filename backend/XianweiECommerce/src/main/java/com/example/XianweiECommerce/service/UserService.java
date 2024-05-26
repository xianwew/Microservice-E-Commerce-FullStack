package com.example.XianweiECommerce.service;
import com.example.XianweiECommerce.dto.UserDTO;
import com.example.XianweiECommerce.exception.ResourceNotFoundException;
import com.example.XianweiECommerce.exception.UserAlreadyExistsException;
import com.example.XianweiECommerce.mapper.UserMapper;
import com.example.XianweiECommerce.model.User;
import com.example.XianweiECommerce.repository.AddressRepository;
import com.example.XianweiECommerce.repository.RatingRepository;
import com.example.XianweiECommerce.repository.UserRepository;
import com.example.XianweiECommerce.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final RatingRepository ratingRepository;
    private final KeycloakService keycloakService;
    private final CloudinaryService cloudinaryService;
    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    public UserService(UserRepository userRepository,
                       AddressRepository addressRepository,
                       RatingRepository ratingRepository,
                       KeycloakService keycloakService,
                       CloudinaryService cloudinaryService,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.ratingRepository = ratingRepository;
        this.keycloakService = keycloakService;
        this.cloudinaryService = cloudinaryService;
        this.jwtTokenProvider = jwtTokenProvider;
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
        String token = keycloakService.getUserToken(userDTO.getEmail(), userDTO.getPassword());

        // Extract the user ID from the token
        String keycloakUserId = jwtTokenProvider.extractUserIdFromToken(token);
        log.info("Extracted Keycloak user ID: {}", keycloakUserId);
        user.setId(keycloakUserId); // Ensure the ID is set correctly

        userRepository.save(user);
        log.info("Successfully created a user with ID: {}", user.getId());
        return token;
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User", "email", email)
        );
        return UserMapper.toDTO(user);
    }

    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );
        return UserMapper.toDTO(user);
    }

    public boolean updateUser(String id, UserDTO userDTO, MultipartFile profilePicture) throws IOException {
        User existingUser = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );
        UserMapper.updateEntityFromDTO(userDTO, existingUser);
        log.info("start saving user!");
        if (profilePicture != null && !profilePicture.isEmpty()) {
            Map<String, Object> uploadResult = cloudinaryService.uploadFile(profilePicture.getBytes(), "XianweiECommerce/UserAvatar");
            existingUser.setProfilePictureUrl((String) uploadResult.get("url"));
        }
        log.info("saving user! " + existingUser);
        userRepository.save(existingUser);
        return true;
    }

    public boolean deleteUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
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


