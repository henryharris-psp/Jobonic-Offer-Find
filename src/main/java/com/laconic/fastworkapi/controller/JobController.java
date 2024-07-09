package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ClientDTO;
import com.laconic.fastworkapi.dto.JobDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.enums.JobStatus;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IJobService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/job")
public class JobController {
    private final IJobService jobService;

    @Autowired
    public JobController(IJobService jobService) {
        this.jobService = jobService;
    }

    @Operation(summary = APIDocsHelper.JobAPI.GET_JOB)
    @GetMapping
    public JobDTO getJob(@RequestParam UUID id) {
        return this.jobService.getById(id);
    }

    @Operation(summary = APIDocsHelper.JobAPI.SAVE_JOB)
    @PostMapping
    public JobDTO create(@RequestBody JobDTO jobDTO) {
        return this.jobService.save(jobDTO);
    }

    @Operation(summary = APIDocsHelper.JobAPI.UPDATE_JOB)
    @PutMapping
    public JobDTO update(@RequestParam UUID id, @RequestBody JobDTO jobDTO) {
        return this.jobService.update(id, jobDTO);
    }

    @Operation(summary = APIDocsHelper.JobAPI.GET_ALL_JOB)
    @PostMapping("/all")
    public PaginationDTO<JobDTO> getAllJobs(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.jobService.getAllJobs(pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.JobAPI.DELETE_JOB)
    @DeleteMapping
    public String delete(UUID id) {
        return this.jobService.delete(id);
    }

    @Operation(summary = APIDocsHelper.JobAPI.CHANGE_STATUS)
    @PutMapping("/changeStatus")
    public JobDTO changeJobStatus(@RequestParam UUID id, @RequestParam JobStatus jobStatus) {
        return this.jobService.changeStatus(id, jobStatus);
    }
}
