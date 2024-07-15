package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.EmployerPaymentDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.EmployerPayment;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IEmployerPaymentRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IEmployerPaymentService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Service
public class EmployerPaymentService implements IEmployerPaymentService {
    private final IEmployerPaymentRepo employerPaymentRepo;

    public EmployerPaymentService(IEmployerPaymentRepo employerPaymentRepo) {
        this.employerPaymentRepo = employerPaymentRepo;
    }

    @Override
    public PaginationDTO<EmployerPaymentDTO> getAll(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var searchColumns = Set.of("paymentDate");
        LocalDate searchKeyword = LocalDate.parse(pageAndFilterDTO.getFilter().getSearchKeyword());
        Specification<EmployerPayment> specification = GenericSpecification.hasKeyword(searchKeyword.atStartOfDay(), searchColumns);

        var result = this.employerPaymentRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result, result.getContent().stream().map(EmployerPaymentDTO::new).toList());
    }

    @Override
    public EmployerPaymentDTO getByPaymentId(UUID id) {
        return new EmployerPaymentDTO(this.employerPaymentRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.EMPLOYER_PAYMENT, "id", id.toString())));
    }
}