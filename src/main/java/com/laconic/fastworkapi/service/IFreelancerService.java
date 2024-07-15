package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.FreelancerDTO;
import com.laconic.fastworkapi.dto.FreelancerReceiptDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.UUID;

public interface IFreelancerService {
    FreelancerDTO save(FreelancerDTO freelancerDTO);

    FreelancerDTO update(UUID id, FreelancerDTO freelancerDTO);

    FreelancerDTO getById(UUID id);

    String delete(UUID id);

    PaginationDTO<FreelancerDTO> getAllFreelancers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    PaginationDTO<FreelancerReceiptDTO> getAll(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    FreelancerReceiptDTO getByReceiptId(UUID id);
}
