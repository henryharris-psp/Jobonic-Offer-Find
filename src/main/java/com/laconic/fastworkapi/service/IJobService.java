package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.JobDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.enums.JobStatus;

import java.util.UUID;

public interface IJobService {
    JobDTO save(JobDTO jobDTO);
    JobDTO update(UUID id, JobDTO jobDTO);
    JobDTO getById(UUID id);
    String delete(UUID id);
    JobDTO changeStatus(UUID id, JobStatus jobStatus);
    PaginationDTO<JobDTO> getAllJobs(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
}
