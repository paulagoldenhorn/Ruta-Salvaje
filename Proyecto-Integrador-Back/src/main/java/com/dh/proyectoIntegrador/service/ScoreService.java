package com.dh.proyectoIntegrador.service;

import com.dh.proyectoIntegrador.entity.*;
import com.dh.proyectoIntegrador.exception.BadRequestException;
import com.dh.proyectoIntegrador.exception.ResourceNotFoundException;
import com.dh.proyectoIntegrador.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class ScoreService {

    private final static Logger LOGGER = Logger.getLogger(ScoreService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    ObjectMapper objectMapper;

    private ScoreDTO convertScoreToScoreDTO(Score score) {
        ScoreDTO scoreDTO = objectMapper.convertValue(score, ScoreDTO.class);
        scoreDTO.setUserId(score.getUser().getId());
        scoreDTO.setProductId(score.getProduct().getId());
        return scoreDTO;
    }

    public ScoreDTO createScore(Score score) throws BadRequestException {

        Optional<Product> product = productRepository.findById(score.getProduct().getId());
        if (product.isEmpty()) {
            throw new BadRequestException("invalid product Id");
        }
        else{
            LOGGER.info("Score saved successfully");
            score.setProduct(product.get());
            return convertScoreToScoreDTO(scoreRepository.save(score));
        }

    }

    public ScoreDTO getScore(Long id) throws ResourceNotFoundException {
        Optional<Score> foundedScore = scoreRepository.findById(id);
        if (foundedScore.isEmpty()) {
            LOGGER.warn("Score does not exist");
            throw new ResourceNotFoundException("Score does not exist");
        } else {
            LOGGER.info("Score founded successfully");
            return convertScoreToScoreDTO(foundedScore.get());
        }
    }

    public Set<ScoreDTO> findScoresByProductId(Long product_id) {
        List<Score> scores = scoreRepository.findByProductId(product_id);
        Set<ScoreDTO> scoreDTOS = new HashSet<>();
        for (Score score : scores) scoreDTOS.add(convertScoreToScoreDTO(score));
        return scoreDTOS;
    }

    public Set<ScoreDTO> getAllScores() {
        List<Score> scores = scoreRepository.findAll();
        Set<ScoreDTO> scoreDTOS = new HashSet<>();
        for (Score score : scores) scoreDTOS.add(convertScoreToScoreDTO(score));
        return scoreDTOS;
    }

    public void deleteScore(Long id) throws ResourceNotFoundException {
        Optional<Score> foundedScore = scoreRepository.findById(id);
        if (foundedScore.isEmpty()) {
            LOGGER.warn("score does not exist");
            throw new ResourceNotFoundException("score does not exist");
        } else {
            LOGGER.info("score deleted successfully");
            scoreRepository.deleteById(id);
        }

    }

}
