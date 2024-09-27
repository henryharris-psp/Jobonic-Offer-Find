package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.PaymentOutDTO;

import java.util.List;
import java.util.UUID;

public interface PaymentOutService {
    UUID save(PaymentOutDTO dto);

    UUID update(UUID id, PaymentOutDTO dto);

    List<PaymentOutDTO> getAll();

    PaymentOutDTO getById(UUID id);
}
