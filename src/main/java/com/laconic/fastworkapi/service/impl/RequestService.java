package com.laconic.fastworkapi.service.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceRequestDTO;
import com.laconic.fastworkapi.entity.ServiceManagement;
import com.laconic.fastworkapi.entity.ServiceRequest;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IServiceRepo;
import com.laconic.fastworkapi.repo.IServiceRequestRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.IRequestService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class RequestService implements IRequestService {
    private final IServiceRequestRepo serviceRequestRepo;
    private final IServiceRepo serviceRepo;
    private final IUserRepo userRepo;

    @Autowired
    public RequestService(IServiceRequestRepo serviceRequestRepo, IServiceRepo serviceRepo, IUserRepo userRepo) {
        this.serviceRequestRepo = serviceRequestRepo;
        this.serviceRepo = serviceRepo;
        this.userRepo = userRepo;
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

    /*
    @Author     : Soe
    @Created At : Aug 26, 2024
    @Note       : update method for service request
     */
    @Override
    public ServiceRequestDTO updateServiceRequest(ServiceRequestDTO serviceRequestDTO) {

        var user = this.userRepo.findById(serviceRequestDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        serviceRequestDTO.getProfileId().toString()));

        var service = this.serviceRepo.findById(serviceRequestDTO.getServiceId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        serviceRequestDTO.getServiceId().toString()));

        var serviceRequest = getServiceRequest(serviceRequestDTO.getId());

        if (serviceRequest != null) {
            serviceRequest.setSubmissionDeadline(serviceRequestDTO.getSubmissionDeadline());
            serviceRequest.setWorkExample(serviceRequestDTO.getWorkExample());
            serviceRequest.setProfile(user);
            serviceRequest.setServiceManagement(service);
        } else {
            throw new IllegalArgumentException("Service request with id " + serviceRequestDTO.getId() + " not found");
        }

        return new ServiceRequestDTO(this.serviceRequestRepo.save(serviceRequest));
    }

    private ServiceRequest getServiceRequest(UUID serviceRequestId) {
        return this.serviceRequestRepo.findById(serviceRequestId)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE_REQUEST, "id",
                                                                    serviceRequestId.toString()));
    }
}
