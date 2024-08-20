package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.*;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.ServiceManagement;
import com.laconic.fastworkapi.entity.ServiceRequest;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.ICategoryRepo;
import com.laconic.fastworkapi.repo.IServiceRepo;
import com.laconic.fastworkapi.repo.IServiceRequestRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.specification.GenericSpecification;
import com.laconic.fastworkapi.service.IManagementService;
import com.laconic.fastworkapi.utils.EntityMapper;
import com.laconic.fastworkapi.utils.ServiceManagementSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ManagementService implements IManagementService {
    private final IServiceRepo serviceRepo;
    private final IServiceRequestRepo serviceRequestRepo;
    private final IUserRepo userRepo;
    private final ICategoryRepo categoryRepo;

    @Autowired
    public ManagementService(IServiceRepo serviceRepo, IServiceRequestRepo serviceRequestRepo, IUserRepo userRepo, ICategoryRepo categoryRepo) {
        this.serviceRepo = serviceRepo;
        this.serviceRequestRepo = serviceRequestRepo;
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

    private static ServiceDTO.GetRequestService mapToGetRequestService(ServiceRequest service) {
        return new ServiceDTO.GetRequestService(
                service.getId(),
                service.getSubmissionDeadline(),
                service.getWorkExample()
        );
    }

    @Override
    public ServiceDTO.WithProfile save(ServiceDTO serviceDTO) {
        var user = userRepo.findById(serviceDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", serviceDTO.getProfileId().toString()));

        var category = categoryRepo.findById(serviceDTO.getCategoryId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CATEGORY, "id", serviceDTO.getCategoryId().toString()));

        var serviceManagement = EntityMapper.mapToEntity(serviceDTO, ServiceManagement.class);
        serviceManagement.setProfile(user);
        serviceManagement.setCategory(category);

        var savedService = serviceRepo.save(serviceManagement);
        return getServiceWithProfile(savedService, user);
    }

    @Override
    public String remove(UUID id) {
        var service = serviceRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id", id.toString()));

        service.setActive(false);
        serviceRepo.save(service);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.SERVICE);
    }

    @Override
    public List<ServiceDTO.WithProfile> getAllByUser(Long profileId) {
        var user = userRepo.findById(profileId)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", profileId.toString()));

        return serviceRepo.findAllByProfileId(profileId)
                .stream()
                .map(service -> getServiceWithProfile(service, user))
                .collect(Collectors.toList());
    }

    @Override
    public ServiceDTO.WithProfile getById(UUID id) {
        var service = serviceRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id", id.toString()));

        var user = service.getProfile();
        return getServiceWithProfile(service, user);
    }

    @Override
    public List<ServiceManagement> getFilterByPriceAndDate(ServiceFilterDTO serviceFilterDTO) {
        Double minPrice = serviceFilterDTO.getMinPrice();
        Double maxPrice = serviceFilterDTO.getMaxPrice();
        LocalDate submissionDeadline = serviceFilterDTO.getSubmissionDeadline();

        if (submissionDeadline == null && serviceFilterDTO.getSubmissionDeadline() != null) {
            submissionDeadline = parseDate(serviceFilterDTO.getSubmissionDeadline().toString());
        }

        return serviceRepo.findAndFilterByPriceAndDate(minPrice, maxPrice, submissionDeadline);
    }

    private LocalDate parseDate(String dateString) {
        if (dateString == null || dateString.isEmpty()) {
            return null;
        }

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return LocalDate.parse(dateString, formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format: " + dateString, e);
        }
    }

    @Override
    public PaginationDTO<ServiceDTO.WithProfile> getAllServices(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();
        Specification<ServiceManagement> specs = GenericSpecification.hasKeyword(keyword, Set.of("title"));

        Page<ServiceManagement> servicePage = (keyword != null) ?
                serviceRepo.findAll(specs, pageAndFilterDTO.getPageRequest())
                : serviceRepo.findAll(pageAndFilterDTO.getPageRequest());

        List<ServiceDTO.WithProfile> servicesWithProfile = servicePage
                .stream()
                .map(service -> getServiceWithProfile(service, service.getProfile()))
                .collect(Collectors.toList());

        return PaginationHelper.getResponse(servicePage, servicesWithProfile);
    }

    @Override
    public PaginationDTO<ServiceDTO.GetRequestService> getAllRequestService(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();
        Specification<ServiceRequest> specs = GenericSpecification.hasKeyword(keyword, Set.of("title"));

        Page<ServiceRequest> servicePage = (keyword != null) ?
                serviceRequestRepo.findAll(specs, pageAndFilterDTO.getPageRequest())
                : serviceRequestRepo.findAll(pageAndFilterDTO.getPageRequest());

        List<ServiceDTO.GetRequestService> requestServices = servicePage
                .stream()
                .map(ManagementService::mapToGetRequestService)
                .collect(Collectors.toList());

        return PaginationHelper.getResponse(servicePage, requestServices);
    }


    public PaginationDTO<ServiceDTO.WithProfile> filterServices(UUID categoryId, Double minPrice, Double maxPrice, PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        if (minPrice == null) {
            minPrice = 0.0;
        }
        if (maxPrice == null) {
            maxPrice = Double.MAX_VALUE;
        }

        Specification<ServiceManagement> specification = ServiceManagementSpecification.filterByCategoryAndPrice(
                categoryId, minPrice, maxPrice);

        Page<ServiceManagement> servicePage = serviceRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        List<ServiceDTO.WithProfile> servicesWithProfile = servicePage.stream()
                .map(service -> getServiceWithProfile(service, service.getProfile()))
                .collect(Collectors.toList());

        return PaginationHelper.getResponse(servicePage, servicesWithProfile);
    }
}