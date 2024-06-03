package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.FreelancerDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Freelancer;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IFreelancerRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IFreelancerService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class FreelancerService implements IFreelancerService {
    private final IFreelancerRepo freelancerRepo;

    public FreelancerService(IFreelancerRepo freelancerRepo) {
        this.freelancerRepo = freelancerRepo;
    }

    @Override
    public FreelancerDTO save(FreelancerDTO freelancerDTO) {
        return new FreelancerDTO(this.freelancerRepo.save(freelancerDTO.updateFreelancer(new Freelancer())));
    }

    @Override
    public FreelancerDTO update(UUID id, FreelancerDTO freelancerDTO) {
        var existingFreelancer = this.getFreelancer(id);
        return new FreelancerDTO(this.freelancerRepo.save(freelancerDTO.updateFreelancer(existingFreelancer)));
    }

    @Override
    public FreelancerDTO getById(UUID id) {
        return new FreelancerDTO(this.getFreelancer(id));
    }

    @Override
    public String delete(UUID id) {
        var existingFreelancer = this.getFreelancer(id);
        existingFreelancer.setActive(false);
        this.freelancerRepo.save(existingFreelancer);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.FREELANCER);
    }

    @Override
    public PaginationDTO<FreelancerDTO> getAllFreelancers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var searchColumns = Set.of("firstName", "lastName", "company", "skills");
        Specification<Freelancer> specification =
                GenericSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword(), searchColumns);
        var result = this.freelancerRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result, result.getContent().stream().map(FreelancerDTO::new).toList());
    }

    private Freelancer getFreelancer(UUID id) {
        return this.freelancerRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.FREELANCER,
                                                                                                   "id",
                                                                                                   id.toString()));
    }
}
