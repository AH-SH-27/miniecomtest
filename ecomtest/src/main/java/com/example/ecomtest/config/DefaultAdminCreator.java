package com.example.ecomtest.config;

import com.example.ecomtest.entity.User;
import com.example.ecomtest.entity.enums.Gender;
import com.example.ecomtest.entity.enums.Roles;
import com.example.ecomtest.repository.UserRepository;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DefaultAdminCreator implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DefaultAdminCreator(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "test@gmail.com";

        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setFullName("Test Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("aA@123456789"));
            admin.setRole(Roles.ADMIN);
            admin.setDateOfBirth(LocalDate.of(2001, 10, 27));
            admin.setGender(Gender.MALE);
            admin.setPhoneNumber("0000000000");
            admin.setAddress("Default Address");

            userRepository.save(admin);
        }
    }
}
