package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.JobDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Job;
import com.laconic.fastworkapi.enums.JobStatus;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IJobRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class JobService implements IJobService {
    private final IJobRepo jobRepo;

    @Autowired
    public JobService(IJobRepo jobRepo) {
        this.jobRepo = jobRepo;
    }

    @Override
    public JobDTO save(JobDTO jobDTO) {
        return new JobDTO(this.jobRepo.save(jobDTO.updateJob(new Job())));
    }

    @Override
    public JobDTO update(UUID id, JobDTO jobDTO) {
        var existingJob = this.getJob(id);
        return new JobDTO(this.jobRepo.save(jobDTO.updateJob(existingJob)));
    }

    @Override
    public JobDTO getById(UUID id) {
        return new JobDTO(this.getJob(id));
    }

    @Override
    public String delete(UUID id) {
        var existingJob = this.getJob(id);
        existingJob.setActive(false);
        this.jobRepo.save(existingJob);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.JOB);
    }

    @Override
    public JobDTO changeStatus(UUID id, JobStatus jobStatus) {
        var existingJob = this.getJob(id);
        existingJob.setJobStatus(jobStatus);
        return new JobDTO(this.jobRepo.save(existingJob));
    }

    @Override
    public PaginationDTO<JobDTO> getAllJobs(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var searchColumns = Set.of("title", "location", "description");
        Specification<Job> specification =
                GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), searchColumns);
        var result = this.jobRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result, result.getContent().stream().map(JobDTO::new).toList());
    }

    private Job getJob(UUID id) {
        return this.jobRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.JOB, "id",
                                                                                            id.toString()));
    }
}
