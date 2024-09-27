package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.PaymentDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import org.springframework.data.domain.PageRequest;

import java.util.UUID;

public interface PaymentService {

    UUID save(PaymentDTO paymentDTO);

    PaymentDTO getById(UUID id);

    PaginationDTO<?> filter(PaymentDTO.PaymentSearchDTO filterDTO);
}
