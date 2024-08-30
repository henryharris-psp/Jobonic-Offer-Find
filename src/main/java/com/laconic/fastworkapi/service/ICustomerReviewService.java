package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.CustomerReviewDTO;

import java.util.List;
import java.util.UUID;

public interface ICustomerReviewService {

    CustomerReviewDTO save(CustomerReviewDTO dto);

    CustomerReviewDTO findById(UUID id);

    List<CustomerReviewDTO> findAll();

    CustomerReviewDTO update(CustomerReviewDTO dto);

    void deleteById(UUID id);
}

