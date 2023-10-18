package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.entity.Product;
import com.dh.proyectoIntegrador.entity.Reservation;
import com.dh.proyectoIntegrador.entity.User;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.ProductRepository;
import com.dh.proyectoIntegrador.repository.ReservationRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ReservationService {

    private final static Logger LOGGER = Logger.getLogger(ProductService.class);

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EmailSenderService mailSender;

    public Reservation createReservation(Reservation reservation) throws BadRequestException {
        Long productId = reservation.getProduct().getId();
        List<Reservation> productReservations = reservationRepository.verifyProductAvailability(productId, reservation.getStart_date(), reservation.getEnd_date());
        Optional<Product> productToReserve = productRepository.findById(productId);

        if (productReservations.size() != 0) {
          throw new BadRequestException("Product unavailable in the given date range");
        }
        else if (productToReserve.isEmpty()) {
            throw new BadRequestException("Product does not exist");
        }
        else {
            User user = reservation.getUser();
            Product product = productToReserve.get();
            reservation.setProduct(product);

            mailSender.sendEmail(user.getEmail(),
                    "¡Reserva en Rutas Salvajes exitosa!",

                    "¡Felicidades " + user.getName() + " " + user.getLastname() +
                            ", tu reserva fue completada con éxito!" + "\n" +

                            "Los datos de tu reserva son:" + "\n" +
                            "Paquete de experiencia: " + product.getName() + "\n" +
                            "Reservado del " + reservation.getStart_date() + " al " + reservation.getEnd_date() + "\n" +
                            "Precio final: $" + reservation.getPrice()
            );

            return reservationRepository.save(reservation);
        }
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) throws ResourceNotFoundException {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isEmpty()) throw new ResourceNotFoundException("Reservation does not exist");
        else return reservation.get();
    }

    public Optional<List<Reservation>> getReservationByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public Optional<List<Reservation>> getReservationByProductId(Long product_id){
        return reservationRepository.findByProductId(product_id);
    }

    public void deleteReservation(Long id) throws ResourceNotFoundException {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isEmpty()) throw new ResourceNotFoundException("Reservation does not exist");
        else reservationRepository.deleteById(id);
    }
}
