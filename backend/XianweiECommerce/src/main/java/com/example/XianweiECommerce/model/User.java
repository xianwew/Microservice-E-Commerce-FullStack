package com.example.XianweiECommerce.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    private String firstName;
    private String lastName;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "addressId")
    private Address address;

    @OneToOne
    @JoinColumn(name = "ratingId")
    private Rating rating;

    // Getters and setters are inherited from BaseEntity
}


