package com.example.XianweiECommerce.controller;
import com.example.XianweiECommerce.dto.ResponseDto;
import com.example.XianweiECommerce.dto.UserDTO;
import com.example.XianweiECommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
@RestController
@RequestMapping(path="/api/users", produces = "application/json")
@Validated
public class UserController {

    private final UserService userService;

    private final Environment environment;

    @Autowired
    public UserController(UserService userService, Environment environment) {
        this.userService = userService;
        this.environment = environment;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createUser(@Valid @RequestBody UserDTO userDTO) {
        userService.createUser(userDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto("201", "User created successfully"));
    }

    @GetMapping("/fetch")
    public ResponseEntity<UserDTO> fetchUserByEmail(@RequestParam
                                                    @Pattern(regexp=".+@.+\\..+", message = "Email should be valid")
                                                    String email) {
        UserDTO userDTO = userService.getUserByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDto> updateUser(@Valid @RequestBody UserDTO userDTO) {
        boolean isUpdated = userService.updateUser(userDTO.getId(), userDTO);
        if (isUpdated) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto("200", "User updated successfully"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto("417", "Failed to update user"));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDto> deleteUser(@RequestParam
                                                  @Pattern(regexp=".+@.+\\..+", message = "Email should be valid")
                                                  String email) {
        boolean isDeleted = userService.deleteUser(email);
        if (isDeleted) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto("200", "User deleted successfully"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseDto("417", "Failed to delete user"));
        }
    }

    @GetMapping("/java-version")
    public ResponseEntity<String> getJavaVersion() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(environment.getProperty("JAVA_HOME"));
    }
}

