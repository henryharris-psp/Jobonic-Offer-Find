package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.PayniRequestDTO;
import com.laconic.fastworkapi.dto.PayniResponseDTO;

public interface IPayniService {
    PayniResponseDTO createPayment(PayniRequestDTO payniRequestDTO);
}
