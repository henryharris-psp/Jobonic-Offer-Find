package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceOfferDTO;
import com.laconic.fastworkapi.dto.ServiceRequestDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.ServiceManagement;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.IServiceRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IManagementService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class ManagementService implements IManagementService {
    private final IServiceRepo serviceRepo;
    private final IUserRepo userRepo;

    @Autowired
    public ManagementService(IServiceRepo serviceRepo, IUserRepo userRepo) {
        this.serviceRepo = serviceRepo;
        this.userRepo = userRepo;
    }

    @Override
    public ServiceDTO.WithProfile save(ServiceDTO serviceDTO) {
        var user = this.userRepo.findById(serviceDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                    serviceDTO.getProfileId().toString()));
        var serviceManagement = EntityMapper.mapToEntity(serviceDTO, ServiceManagement.class);
        serviceManagement.setProfile(user);
        var service = this.serviceRepo.save(serviceManagement);
        return getServiceWithProfile(service, user);
    }

    @Override
    public String remove(UUID id) {
        var service = this.serviceRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                                                                    id.toString()));
        service.setActive(false);
        this.serviceRepo.save(service);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.SERVICE);
    }

    @Override
    public List<ServiceDTO.WithProfile> getAllByUser(UUID profileId) {
        var user = this.userRepo.findById(profileId)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                    profileId.toString()));
        var services = this.serviceRepo.findAllByProfileId(profileId);
        return services.stream().map(s -> getServiceWithProfile(s, user)).toList();
    }

    @Override
    public PaginationDTO<ServiceDTO> getAllServices(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();
        Specification<ServiceManagement> specs =
                GenericSpecification.hasKeyword(keyword, Set.of("title", "serviceRequest_workCategory"));

        var result = keyword != null ?
                this.serviceRepo.findAll(specs, pageAndFilterDTO.getPageRequest())
                : this.serviceRepo.findAll(pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(result,
                                            result.getContent().stream().map(data -> EntityMapper.mapToResponse(data,
                                                                                                                ServiceDTO.class)).toList());
    }

    private static ServiceDTO.WithProfile getServiceWithProfile(ServiceManagement service, Profile user) {
        return new ServiceDTO.WithProfile(service.getId(),
                                          EntityMapper.mapToResponse(service.getServiceOffer(), ServiceOfferDTO.class),
                                          EntityMapper.mapToResponse(service.getServiceRequest(), ServiceRequestDTO.class),
                                          EntityMapper.mapToEntity(user, ProfileDTO.class),
                                          service.getTitle());
    }
}
