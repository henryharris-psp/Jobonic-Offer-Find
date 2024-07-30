package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.*;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.ServiceManagement;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.ICategoryRepo;
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
    private final ICategoryRepo categoryRepo;

    @Autowired
    public ManagementService(IServiceRepo serviceRepo, IUserRepo userRepo, ICategoryRepo categoryRepo) {
        this.serviceRepo = serviceRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
    }

    private static ServiceDTO.WithProfile getServiceWithProfile(ServiceManagement service, Profile user) {
        return new ServiceDTO.WithProfile(
                service.getId(),
                EntityMapper.mapToResponse(service.getServiceOffer(), ServiceOfferDTO.class),
                EntityMapper.mapToResponse(service.getServiceRequest(), ServiceRequestDTO.class),
                EntityMapper.mapToResponse(user, ProfileDTO.class),
                service.getTitle(),
                service.getEmploymentType(),
                service.getDescription(),
                service.getDescription1(),
                service.getDescription2(),
                service.getDescription3(),
                service.getLanguageSpoken(),
                service.getLocation(),
                EntityMapper.mapToResponse(service.getCategory(), CategoryDTO.class),
                service.getPrice(),
                service.getPriceUnit()
        );
    }

    @Override
    public ServiceDTO.WithProfile save(ServiceDTO serviceDTO) {
        var user = this.userRepo.findById(serviceDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        serviceDTO.getProfileId().toString()));
        var category = this.categoryRepo.findById(serviceDTO.getCategoryId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CATEGORY, "id",
                        serviceDTO.getCategoryId().toString()));
        var serviceManagement = EntityMapper.mapToEntity(serviceDTO, ServiceManagement.class);
        serviceManagement.setProfile(user);
        serviceManagement.setCategory(category);
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
    public List<ServiceDTO.WithProfile> getAllByUser(Long profileId) {
        var user = this.userRepo.findById(profileId)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        profileId.toString()));
        var services = this.serviceRepo.findAllByProfileId(profileId);
        return services.stream().map(s -> getServiceWithProfile(s, user)).toList();
    }

    @Override
    public ServiceDTO.WithProfile getById(UUID id) {
        var service = this.serviceRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        id.toString()));
        var user = this.userRepo.findById(service.getProfile().getId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        service.getProfile().getId().toString()));
        return getServiceWithProfile(service, user);
    }

    @Override
    public PaginationDTO<ServiceDTO> getAllServices(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();
        Specification<ServiceManagement> specs =
                GenericSpecification.hasKeyword(keyword, Set.of("title"));

        var result = keyword != null ?
                this.serviceRepo.findAll(specs, pageAndFilterDTO.getPageRequest())
                : this.serviceRepo.findAll(pageAndFilterDTO.getPageRequest());

        var serviceDTOList = result.getContent().stream()
                .map(EntityMapper::mapToServiceDTO)
                .toList();

        return PaginationHelper.getResponse(result, serviceDTOList);
    }
}
