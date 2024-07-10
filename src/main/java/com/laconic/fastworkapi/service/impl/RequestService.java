package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceRequestDTO;
import com.laconic.fastworkapi.entity.ServiceRequest;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IServiceRequestRepo;
import com.laconic.fastworkapi.service.IRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RequestService implements IRequestService {
    private final IServiceRequestRepo serviceRequestRepo;

    @Autowired
    public RequestService(IServiceRequestRepo serviceRequestRepo) {
        this.serviceRequestRepo = serviceRequestRepo;
    }

    @Override
    public ServiceRequestDTO update(UUID serviceRequestId, ServiceRequestDTO serviceRequestDTO) {
        var serviceRequest = this.getServiceRequest(serviceRequestId);
        return new ServiceRequestDTO(this.serviceRequestRepo.save(serviceRequestDTO.updateServiceRequest(serviceRequest)));
    }

    @Override
    public String remove(UUID serviceRequestId) {
        var serviceRequest = this.getServiceRequest(serviceRequestId);
        serviceRequest.setActive(false);
        this.serviceRequestRepo.save(serviceRequest);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.SERVICE_REQUEST);
    }

    private ServiceRequest getServiceRequest(UUID serviceRequestId) {
        return this.serviceRequestRepo.findById(serviceRequestId)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE_REQUEST, "id",
                                                                    serviceRequestId.toString()));
    }
}
