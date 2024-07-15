package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.List;
import java.util.UUID;

public interface IManagementService {
    ServiceDTO.WithProfile save(ServiceDTO serviceDTO);

    String remove(UUID id);

    List<ServiceDTO.WithProfile> getAllByUser(Long profileId);

    PaginationDTO<ServiceDTO> getAllServices(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
}
