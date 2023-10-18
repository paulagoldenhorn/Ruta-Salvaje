package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.authentication.RegisterRequest;
import com.dh.proyectoIntegrador.entity.*;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.ImageRepository;
import com.dh.proyectoIntegrador.repository.ReservationRepository;
import com.dh.proyectoIntegrador.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final static Logger LOGGER = Logger.getLogger(UserService.class);
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final ObjectMapper mapper;

    private final EmailSenderService mailSender;

    private final ImageRepository imageRepository;

    public User createUser(RegisterRequest request) throws BadRequestException {
        Optional<User> foundedUser = userRepository.findByEmail(request.getEmail());

        if (foundedUser.isEmpty()) {
            if (request.getPassword().length() >= 4 && request.getPassword().length() <= 15) {
                var user = User.builder()
                        .name(request.getName())
                        .lastname(request.getLastname())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(request.getRole())
                        .build();
                LOGGER.info("User created successfully");

                mailSender.sendEmail(request.getEmail(),
                        "¡Registro a Rutas Salvajes exitoso!",

                        "¡Felicidades " + request.getName() + " " + request.getLastname() +
                                ", tu registro fue completado con éxito!" + "\n" +

                                "Tus datos son:" + "\n" +
                                "Email: " + request.getEmail() + "\n" +
                                "Nombre: " + request.getName() + "\n" +
                                "Apellido: " + request.getLastname() + "\n" +
                                "No olvides que puedes editar tu perfil desde el panel de usuario cuando desees." + "\n" +

                                "Haz click aquí para iniciar sesión y comenzar tu aventura en Rutas Salvajes:" + "\n" +
                                "http://localhost:5173/login"
                );

                return userRepository.save(user);
            }
            else throw new BadRequestException("Password must have between 4 to 15 characters");
        }
        else throw new BadRequestException("Email already registered");
    }

    public User getUserByEmail(String email) throws ResourceNotFoundException {
        Optional<User> foundedUser = userRepository.findByEmail(email);

        if (foundedUser.isEmpty()) {
            throw new ResourceNotFoundException("User does not exist");
        }

        else return foundedUser.get();
    }

    public UserDTO getUserById(Long id) throws ResourceNotFoundException {
        Optional<User> foundedUser = userRepository.findById(id);

        if (foundedUser.isEmpty()) {
            throw new ResourceNotFoundException("User does not exist");
        }

        return mapper.convertValue(foundedUser.get(), UserDTO.class);
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public void deleteUser(Long id) throws ResourceNotFoundException {
        Optional<User> foundedUser = userRepository.findById(id);

        if (foundedUser.isEmpty()) {
            LOGGER.warn("User does not exist");
            throw new ResourceNotFoundException("User does not exist");
        }

        LOGGER.info("User deleted successfully");
        userRepository.deleteById(id);
    };

    public User updateUser(User user) throws BadRequestException {
        Optional<User> foundedUser = userRepository.findByEmail(user.getEmail());

        /* If there's a user founded by the given email, we must check if it's the user we want
           to update or not (in that case, the operation isn't permitted because there can't be
           two different users with the same email) */
        if (foundedUser.isPresent()) {
            if (!Objects.equals(foundedUser.get().getId(), user.getId()))
                throw new BadRequestException("Email already registered");
        }

        if (user.getPassword().length() >= 4 && user.getPassword().length() <= 15) {
            var updatedUser = User.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .lastname(user.getLastname())
                    .email(user.getEmail())
                    .password(passwordEncoder.encode(user.getPassword()))
                    .role(user.getRole())
                    .build();
            LOGGER.info("User updated successfully");
            return userRepository.save(updatedUser);
        }
        else
            throw new BadRequestException("Password must have between 4 to 15 characters");
    }

    public User updateUserLimited(User user) throws BadRequestException {
        Optional<User> foundedUserByID = userRepository.findById(user.getId());
        if (foundedUserByID.isEmpty()) {
            throw new BadRequestException("Could not find User by the given ID");
        }
        /* If there's a user founded by the given email, we must check if it's the user we want
           to update or not (in that case, the operation isn't permitted because there can't be
           two different users with the same email) */
        Optional<User> foundedUserByEmail = userRepository.findByEmail(user.getEmail());
        if (foundedUserByEmail.isPresent()) {
            if (!Objects.equals(foundedUserByEmail.get().getId(), user.getId()))
                throw new BadRequestException("Email already registered");
        }
        var updatedUser = User.builder()
                .id(user.getId())
                .name(user.getName())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .password(foundedUserByID.get().getPassword())
                .role(foundedUserByID.get().getRole())
                .build();
        LOGGER.info("User updated successfully");
        return userRepository.save(updatedUser);
    }

    public User updateUserRole(User user) throws BadRequestException {
        Optional<User> foundUser = userRepository.findById(user.getId());

        if (foundUser.isPresent()) {
            if(foundUser.get().getRole().equals(Role.ADMIN)){
            var updatedUser = User.builder()
                    .id(user.getId())
                    .name(foundUser.get().getName())
                    .lastname(foundUser.get().getLastname())
                    .email(foundUser.get().getEmail())
                    .password(foundUser.get().getPassword())
                    .role(Role.BASIC)
                    .build();
            LOGGER.info("User role updated successfully");
            return userRepository.save(updatedUser);}

         if(foundUser.get().getRole().equals(Role.BASIC)){
            var updatedUser = User.builder()
                    .id(user.getId())
                    .name(foundUser.get().getName())
                    .lastname(foundUser.get().getLastname())
                    .email(foundUser.get().getEmail())
                    .password(foundUser.get().getPassword())
                    .role(Role.ADMIN)
                    .build();
            LOGGER.info("User role updated successfully");
            return userRepository.save(updatedUser);}
        }
        else{
            throw new BadRequestException("User not found");}
        throw new BadRequestException("Role update failed");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> foundedUser = userRepository.findByEmail(username);

        if (foundedUser.isEmpty()) {
            LOGGER.warn("User not found");
            throw new UsernameNotFoundException("User not found");
        }

        else return foundedUser.get();
    }
}
