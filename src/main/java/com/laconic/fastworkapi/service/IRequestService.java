package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ServiceRequestDTO;

import java.util.UUID;

public interface IRequestService {
    ServiceRequestDTO update(UUID serviceRequestId, ServiceRequestDTO serviceRequestDTO);
    String remove(UUID serviceRequestId);
}
