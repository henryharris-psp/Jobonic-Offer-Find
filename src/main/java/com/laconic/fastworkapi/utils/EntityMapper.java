package com.laconic.fastworkapi.utils;

import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceOfferDTO;
import com.laconic.fastworkapi.dto.ServiceRequestDTO;
import com.laconic.fastworkapi.entity.ServiceManagement;
import lombok.experimental.UtilityClass;
import org.modelmapper.ModelMapper;

@UtilityClass
public class EntityMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static <T, U> U mapToRequest(T entity, Class<U> requestClass) {
        return modelMapper.map(entity, requestClass);
    }

    public static <T, U> U mapToResponse(T entity, Class<U> responseClass) {
        if(entity == null) return null;
        return modelMapper.map(entity, responseClass);
    }

    public static <T, U> U mapToEntity(T request, Class<U> entityClass) {
        return modelMapper.map(request, entityClass);
    }

    public static ServiceDTO mapToServiceDTO(ServiceManagement serviceManagement) {
        if (serviceManagement == null) {
            return null;
        }
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(serviceManagement.getId());
        if (serviceManagement.getServiceOffer() != null)
            serviceDTO.setServiceOfferDTO(new   ServiceOfferDTO(serviceManagement.getServiceOffer()));
        if (serviceManagement.getServiceRequest() != null)
            serviceDTO.setServiceRequestDTO(new ServiceRequestDTO(serviceManagement.getServiceRequest()));
        if (serviceManagement.getProfile() != null)
            serviceDTO.setProfileId(serviceManagement.getProfile().getId());
        if (serviceManagement.getCategory() != null)
            serviceDTO.setCategoryId(serviceManagement.getCategory().getId());
        serviceDTO.setTitle(serviceManagement.getTitle());
        serviceDTO.setEmploymentType(serviceManagement.getEmploymentType());
        serviceDTO.setDescription(serviceManagement.getDescription());
        serviceDTO.setDescription1(serviceManagement.getDescription1());
        serviceDTO.setDescription2(serviceManagement.getDescription2());
        serviceDTO.setDescription3(serviceManagement.getDescription3());
        serviceDTO.setLanguageSpoken(serviceManagement.getLanguageSpoken());
        serviceDTO.setLocation(serviceManagement.getLocation());
        serviceDTO.setPrice(serviceManagement.getPrice());
        serviceDTO.setPriceUnit(serviceManagement.getPriceUnit());
        return serviceDTO;
    }
}
