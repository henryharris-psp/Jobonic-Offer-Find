package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.EmployerPaymentDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IEmployerPaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "employer-payment", description = "Employer Payment related APIs")
@RestController
@RequestMapping("/api/v1/employer-payment")
public class EmployerPaymentController {
    private final IEmployerPaymentService employerPaymentService;

    public EmployerPaymentController(IEmployerPaymentService employerPaymentService) {
        this.employerPaymentService = employerPaymentService;
    }

    @Operation(summary = APIDocsHelper.EmployerPaymentAPI.GET_ALL_EMPLOYER_PAYMENT)
    @PostMapping()
    public PaginationDTO<EmployerPaymentDTO> getAll(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.employerPaymentService.getAll(pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.EmployerPaymentAPI.GET_EMPLOYER_PAYMENT)
    @GetMapping()
    public EmployerPaymentDTO getByReceiptId(@RequestParam UUID id) {
        return this.employerPaymentService.getByPaymentId(id);
    }
}