package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ClientDTO;
import com.laconic.fastworkapi.dto.FreelancerDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IFreelancerService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/freelancer")
public class FreelancerController {
    private final IFreelancerService freelancerService;

    public FreelancerController(IFreelancerService freelancerService) {
        this.freelancerService = freelancerService;
    }

    @Operation(summary = APIDocsHelper.FreelancerAPI.GET_FREELANCER)
    @GetMapping
    public FreelancerDTO getFreelancer(@RequestParam UUID id) {
        return this.freelancerService.getById(id);
    }

    @Operation(summary = APIDocsHelper.FreelancerAPI.SAVE_FREELANCER)
    @PostMapping
    public FreelancerDTO create(@RequestBody FreelancerDTO freelancerDTO) {
        return this.freelancerService.save(freelancerDTO);
    }

    @Operation(summary = APIDocsHelper.FreelancerAPI.UPDATE_FREELANCER)
    @PutMapping
    public FreelancerDTO update(@RequestParam UUID id, @RequestBody FreelancerDTO freelancerDTO) {
        return this.freelancerService.update(id, freelancerDTO);
    }

    @Operation(summary = APIDocsHelper.FreelancerAPI.GET_ALL_FREELANCER)
    @PostMapping("/all")
    public PaginationDTO<FreelancerDTO> getAllFreelancers(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.freelancerService.getAllFreelancers(pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.FreelancerAPI.DELETE_FREELANCER)
    @DeleteMapping
    public String delete(UUID id) {
        return this.freelancerService.delete(id);
    }
}
