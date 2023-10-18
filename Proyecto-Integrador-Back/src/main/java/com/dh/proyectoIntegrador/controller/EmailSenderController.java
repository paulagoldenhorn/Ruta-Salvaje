package com.dh.proyectoIntegrador.controller;

import com.dh.proyectoIntegrador.entity.Category;
import com.dh.proyectoIntegrador.entity.User;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.service.EmailSenderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registerConfirm")
public class EmailSenderController {

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping
    @Operation(summary = "Sends confirmation mail after registration")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Mail resent successfully")
    })
    public ResponseEntity<?> resendConfirmationMail(@RequestBody User user) throws BadRequestException {

        emailSenderService.sendEmail(user.getEmail(),"¡Registro a Rutas Salvajes exitoso!","¡Felicidades " + user.getName() + " " + user.getLastname() +
                ", tu registro fue completado con éxito!" + "\n" +

                        "Tus datos son:" + "\n" +
                        "Email: " + user.getEmail() + "\n" +
                        "Nombre: " + user.getName() + "\n" +
                        "Apellido: " + user.getLastname() + "\n" +
                        "No olvides que puedes editar tu perfil desde el panel de usuario cuando desees." + "\n" +

                        "Haz click aquí para iniciar sesión y comenzar tu aventura en Rutas Salvajes:" + "\n" +
                        "http://localhost:5173/login");
        return ResponseEntity.status(HttpStatus.CREATED).body("Mail re sent");
    }

}
