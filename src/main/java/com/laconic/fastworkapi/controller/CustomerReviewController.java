package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.CustomerReviewDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.impl.CustomerReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "customer-review", description = "Customer review related APIs")
@RestController
@RequestMapping("/api/v1/customer-review")
public class CustomerReviewController {

    private final CustomerReviewService customerReviewService;

    @Autowired
    public CustomerReviewController(CustomerReviewService customerReviewService) {
        this.customerReviewService = customerReviewService;
    }

    @Operation(summary = APIDocsHelper.CustomerReviewAPI.SAVE_CUSTOMER_REVIEW)
    @PostMapping
    public CustomerReviewDTO create(@RequestBody CustomerReviewDTO dto) {
        return this.customerReviewService.save(dto);
    }

    @Operation(summary = APIDocsHelper.CustomerReviewAPI.GET_CUSTOMER_REVIEW)
    @GetMapping()
    public CustomerReviewDTO getById(@RequestParam UUID id) {
        return this.customerReviewService.findById(id);
    }

    @Operation(summary = APIDocsHelper.CustomerReviewAPI.GET_ALL_CUSTOMER_REVIEW)
    @GetMapping("/all")
    public List<CustomerReviewDTO> getAll() {
        return this.customerReviewService.findAll();
    }

    @Operation(summary = APIDocsHelper.CustomerReviewAPI.UPDATE_CUSTOMER_REVIEW)
    @PutMapping
    public CustomerReviewDTO update(@RequestBody CustomerReviewDTO dto) {
        return this.customerReviewService.update(dto);
    }

    @Operation(summary = APIDocsHelper.CustomerReviewAPI.DELETE_CUSTOMER_REVIEW)
    @DeleteMapping
    public String deleteById(@RequestParam UUID id) {

        return this.customerReviewService.deleteById(id);
    }
}
