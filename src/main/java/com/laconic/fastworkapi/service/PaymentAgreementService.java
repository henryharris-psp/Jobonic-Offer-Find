package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.PaymentAgreementDTO;

import java.util.List;
import java.util.UUID;

public interface PaymentAgreementService {
    UUID save(PaymentAgreementDTO dto);

    UUID update(UUID id, PaymentAgreementDTO dto);

    List<PaymentAgreementDTO> getAll();

    PaymentAgreementDTO getById(UUID id);
}
