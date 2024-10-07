package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.PaymentDTO;
import com.laconic.fastworkapi.dto.PaymentResponseDTO;
import com.laconic.fastworkapi.dto.PayniResponseDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface PaymentService {

    ResponseEntity<?> save(PaymentDTO paymentDTO);

    PaymentResponseDTO getById(UUID id);

    PaginationDTO<?> filter(PaymentDTO.PaymentSearchDTO filterDTO);

    ResponseEntity<?> getAll();

    String deleteById(UUID id);
}
