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
import com.laconic.fastworkapi.repo.specification.ServiceManagementSpecification;
import com.laconic.fastworkapi.service.IManagementService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ManagementService implements IManagementService {
    private final IServiceRepo serviceRepo;
    private final IUserRepo userRepo;
    private final ICategoryRepo categoryRepo;
    private final IServiceRequestRepo serviceRequestRepo;

    @Autowired
    public ManagementService(IServiceRepo serviceRepo, IUserRepo userRepo, ICategoryRepo categoryRepo, IServiceRequestRepo serviceRequestRepo) {
        this.serviceRepo = serviceRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.serviceRequestRepo = serviceRequestRepo;
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

    /*
    @Author     : Soe
    @Created At : Aug 26, 2024
    @Note       : update method for service offer
     */
    @Override
    public ServiceDTO.WithProfile updateService(ServiceDTO serviceDTO) {

        var user = this.userRepo.findById(serviceDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        serviceDTO.getProfileId().toString()));

        var serviceManagement = this.serviceRepo.findById(serviceDTO.getId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        serviceDTO.getId().toString()));

        if (serviceManagement != null) {

            //resign from the old data from table
            serviceManagement.setServiceOffer(serviceManagement.getServiceOffer());
            serviceManagement.setServiceRequest(serviceManagement.getServiceRequest());
            serviceManagement.setProfile(user);
            serviceManagement.setCategory(serviceManagement.getCategory());

            serviceManagement.setTitle(serviceDTO.getTitle());
            serviceManagement.setEmploymentType(serviceDTO.getEmploymentType());
            serviceManagement.setDescription(serviceDTO.getDescription());
            serviceManagement.setDescription1(serviceDTO.getDescription1());
            serviceManagement.setDescription2(serviceDTO.getDescription2());
            serviceManagement.setDescription3(serviceDTO.getDescription3());
            serviceManagement.setLanguageSpoken(serviceDTO.getLanguageSpoken());
            serviceManagement.setLocation(serviceDTO.getLocation());
            serviceManagement.setPrice(serviceDTO.getPrice());
            serviceManagement.setPriceUnit(serviceDTO.getPriceUnit());

        } else {
            throw new IllegalArgumentException("Service with id " + serviceDTO.getId() + " not found");
        }

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

    // Fetch the services filtered by price and date
    @Override
    public List<ServiceManagement> getFilterByPriceAndDate(ServiceFilterDTO serviceFilterDTO) {
        Double minPrice = serviceFilterDTO.getMinPrice();
        Double maxPrice = serviceFilterDTO.getMaxPrice();
        LocalDate submissionDeadline = serviceFilterDTO.getSubmissionDeadline();

        // If submissionDeadline is not null, ensure it's in LocalDate format
        if (submissionDeadline == null && serviceFilterDTO.getSubmissionDeadline() != null) {
            submissionDeadline = parseDate(String.valueOf(serviceFilterDTO.getSubmissionDeadline()));
        }

        return this.serviceRepo.findAndFilterByPriceAndDate(minPrice, maxPrice, submissionDeadline);
    }

    private LocalDate parseDate(String dateString) {
        if (dateString == null || dateString.isEmpty()) {
            return null; // or handle as appropriate
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        try {
            return LocalDate.parse(dateString, formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format: " + dateString, e);
        }
    }

    // get employer offer services
    @Override
    public PaginationDTO<ServiceDTO.WithProfile> getAllServices(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();
        Specification<ServiceManagement> specs =
                GenericSpecification.hasKeyword((String) keyword, Set.of("title"));

        Page<ServiceManagement> servicePage = keyword != null ?
                this.serviceRepo.findAll(specs, pageAndFilterDTO.getPageRequest())
                : this.serviceRepo.findAll(pageAndFilterDTO.getPageRequest());

        List<ServiceDTO.WithProfile> servicesWithProfile = servicePage.stream()
                .filter(service -> !service.getProfile().getId().equals(pageAndFilterDTO.getAuthId()))
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

    //Convert Entity To DTO
    public ServiceFilterDTO convertEntityToDTO(ServiceManagement serviceManagement) {
        ServiceFilterDTO dto = new ServiceFilterDTO();
        dto.setMinPrice(serviceManagement.getPrice());
        dto.setMaxPrice(serviceManagement.getPrice());
        dto.setSubmissionDeadline(serviceManagement.getServiceRequest().getSubmissionDeadline());
        return dto;
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

    @Override
    public PaginationDTO<ServiceRequestDTO> getAllServiceRequests(Long profileId, PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        Specification<ServiceRequest> specification = null;

        if (profileId != null) {
            specification = (root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("profile").get("id"), profileId);
        }

        Page<ServiceRequest> serviceRequests = this.serviceRequestRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        List<ServiceRequestDTO> serviceRequestDTOS = serviceRequests.stream()
                .map(serviceRequest -> EntityMapper.mapToEntity(serviceRequest, ServiceRequestDTO.class))
                .collect(Collectors.toList());

        return PaginationHelper.getResponse(serviceRequests, serviceRequestDTOS);
    }

    /**
     * @Author : soe
     * @CreatedAt : Aug 27, 2024
     * @Note : Get All request services and related of theirs with pagination and filter
     */
    @Override
    public PaginationDTO<ExtendedServiceRequestDTO.WithProfile> getAllExtendedRequestService(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();
        Specification<ServiceManagement> specs =
                GenericSpecification.hasKeyword((String) keyword, Set.of("title"));

        Page<ServiceManagement> servicePage = (keyword != null) ?
                this.serviceRepo.findAll(specs, pageAndFilterDTO.getPageRequest())
                : this.serviceRepo.findAll(pageAndFilterDTO.getPageRequest());

        // Map the entities to DTOs
        List<ExtendedServiceRequestDTO.WithProfile> extendedServiceWithProfile = servicePage.stream()
                .filter(service -> !service.getProfile().getId().equals(pageAndFilterDTO.getAuthId()))
                .map(service -> getAllExtendedRequestWithProfile(service, service.getProfile()))
                .collect(Collectors.toList());

        // Return the paginated response with the mapped DTOs
        return PaginationHelper.getResponse(servicePage, extendedServiceWithProfile);
    }

    private static ExtendedServiceRequestDTO.WithProfile getAllExtendedRequestWithProfile(ServiceManagement service, Profile user) {
        return new ExtendedServiceRequestDTO.WithProfile(
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

    // Internal method to map ServiceRequest to ExtendedServiceRequestDTO
    private ExtendedServiceRequestDTO mapToExtendedServiceRequestDTO(ServiceRequest serviceRequest) {
        if (serviceRequest == null) {
            return null;
        }

        var serviceManagement = serviceRequest.getServiceManagement();
        if (serviceManagement == null) {
            throw new IllegalArgumentException("ServiceManagement is null for ServiceRequest ID: " + serviceRequest.getId());
        }

        serviceManagement = this.serviceRepo.findById(serviceManagement.getId())
                .orElseThrow();

        UUID categoryId = null;
        if (serviceManagement.getCategory() != null) {
            categoryId = serviceManagement.getCategory().getId();
        }

        return new ExtendedServiceRequestDTO(
                serviceRequest.getId(),
                serviceRequest.getSubmissionDeadline(),
                serviceRequest.getWorkExample(),
                serviceManagement.getProfile().getId(),
                serviceManagement.getDescription(),
                serviceManagement.getDescription1(),
                serviceManagement.getDescription2(),
                serviceManagement.getDescription3(),
                serviceManagement.getEmploymentType(),
                serviceManagement.getLanguageSpoken(),
                serviceManagement.getLocation(),
                serviceManagement.getPrice(),
                serviceManagement.getPriceUnit(),
                serviceManagement.getTitle(),
                categoryId,
                serviceManagement.getProfile().getCardExpiryDate(),
                serviceManagement.getProfile().getCardNumber(),
                serviceManagement.getProfile().getCompanyName(),
                serviceManagement.getProfile().getImage(),
                serviceManagement.getProfile().getPhoneNumber(),
                serviceManagement.getProfile().getReview(),
                serviceManagement.getProfile().getUserId(),
                serviceManagement.getProfile().getWalletAddress()
        );
    }
}