package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.CustomerReviewDTO;
import com.laconic.fastworkapi.entity.CustomerReview;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface ICustomerReviewService {

    CustomerReviewDTO save(CustomerReviewDTO dto);

    CustomerReviewDTO findById(UUID id);

    List<CustomerReviewDTO> findAll();

    CustomerReviewDTO update(CustomerReviewDTO dto);

    String deleteById(UUID id);

    List<CustomerReviewDTO> getReviewForFreelancer(UUID matchId);


    List<CustomerReviewDTO> getReviewBasedOnType(CustomerReview.ReviewType type);
}

