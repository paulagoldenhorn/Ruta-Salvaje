package com.dh.proyectoIntegrador.service;

import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final static Logger LOGGER = Logger.getLogger(EmailSenderService.class);

    private final JavaMailSender mailSender;

    public void sendEmail (String toEmail,
                           String subject,
                           String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rutasalvaje.info@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        LOGGER.info("Email sent successfully");
    }

}
