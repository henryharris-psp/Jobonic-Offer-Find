package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.EmployerPaymentDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.UUID;

public interface IEmployerPaymentService {
    PaginationDTO<EmployerPaymentDTO> getAll(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    EmployerPaymentDTO getByPaymentId(UUID id);
}