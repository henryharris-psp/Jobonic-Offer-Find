package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ExtendedServiceRequestDTO;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceFilterDTO;
import com.laconic.fastworkapi.dto.ServiceRequestDTO;
import com.laconic.fastworkapi.dto.pagination.*;
import com.laconic.fastworkapi.entity.ServiceManagement;

import java.util.List;
import java.util.UUID;

public interface IManagementService {
    ServiceDTO.WithProfile save(ServiceDTO serviceDTO);

    //update service
    ServiceDTO.WithProfile updateService(ServiceDTO serviceDTO);

    String remove(UUID id);

    List<ServiceDTO.WithProfile> getAllByUser(Long profileId);

    ServiceDTO.WithProfile getById(UUID id);

    ExtendedServiceRequestDTO.WithProfile getRequestServiceById(UUID id);

    List<ServiceManagement> getFilterByPriceAndDate(ServiceFilterDTO serviceFilterDTO);

    PaginationDTO<ServiceDTO.WithProfile> getAllServices(PageAndFilterMultipleKeywordDTO<SearchAndFilterMultipleKeywordDTO> pageAndFilterDTO);

    PaginationDTO<ServiceDTO.GetRequestService> getAllRequestService(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    PaginationDTO<ServiceDTO.WithProfile> filterServices(UUID categoryId, Double minPrice, Double maxPrice, PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    PaginationDTO<ServiceRequestDTO> getAllServiceRequests(Long profileId, PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    PaginationDTO<ExtendedServiceRequestDTO> getAllExtendedRequestService(PageAndFilterMultipleKeywordDTO<SearchAndFilterMultipleKeywordDTO> pageAndFilterDTO);

    ServiceDTO.WithProfile getOfferServiceById(UUID serviceId);
}