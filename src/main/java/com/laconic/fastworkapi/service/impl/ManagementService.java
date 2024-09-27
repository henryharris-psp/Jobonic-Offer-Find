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

    private ExtendedServiceRequestDTO.WithProfile getRequestServiceWithProfile(ServiceRequest serviceRequest) {
        if (serviceRequest == null) {
            return null;
        }

        var serviceManagement = serviceRepo.findAllByServiceRequestId(serviceRequest.getId());

        if (serviceManagement == null) {
            throw new IllegalArgumentException("ServiceManagement is null for ServiceRequest ID: " + serviceRequest.getId());
        }

//        serviceManagement = this.serviceRepo.findById(serviceManagement.getId())
//                .orElseThrow();

        UUID categoryId = null;

        if (serviceManagement.getCategory() != null) {
            categoryId = serviceManagement.getCategory().getId();
        }

        return new ExtendedServiceRequestDTO.WithProfile(
                serviceRequest.getId(),
                EntityMapper.mapToResponse(serviceManagement.getServiceOffer(), ServiceOfferDTO.class),
                EntityMapper.mapToResponse(serviceManagement.getServiceRequest(), ServiceRequestDTO.class),
                EntityMapper.mapToResponse(serviceManagement.getProfile(), ProfileDTO.class),
                serviceManagement.getTitle(),
                serviceManagement.getEmploymentType(),
                serviceManagement.getDescription(),
                serviceManagement.getDescription1(),
                serviceManagement.getDescription2(),
                serviceManagement.getDescription3(),
                serviceManagement.getLanguageSpoken(),
                serviceManagement.getLocation(),
                EntityMapper.mapToResponse(serviceManagement.getCategory(), CategoryDTO.class),
                serviceManagement.getPrice(),
                serviceManagement.getPriceUnit()
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

    public ServiceDTO.WithProfile getOfferServiceById(UUID id) {
        var service = this.serviceRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        id.toString()));

        var user = this.userRepo.findById(service.getProfile().getId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        service.getProfile().getId().toString()));

        return getServiceWithProfile(service, user);
    }

    public ExtendedServiceRequestDTO.WithProfile getRequestServiceById(UUID id) {
        var service = this.serviceRequestRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        id.toString()));

        var user = this.userRepo.findById(service.getProfile().getId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        service.getProfile().getId().toString()));

        return getRequestServiceWithProfile(service);
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

        Page<ServiceManagement> servicePage = keyword != null
                ? this.serviceRepo.findAll(Specification.where(specs).and((root, query, criteriaBuilder) ->
                criteriaBuilder.notEqual(root.get("profile").get("id"), pageAndFilterDTO.getAuthId())), pageAndFilterDTO.getPageRequest())
                : this.serviceRepo.findAllExceptAuthUser(pageAndFilterDTO.getAuthId(), pageAndFilterDTO.getPageRequest());

        List<ServiceDTO.WithProfile> servicesWithProfile = servicePage.stream()
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

    @Override
    public PaginationDTO getAllExtendedRequestService(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var keyword = pageAndFilterDTO.getFilter().getSearchKeyword();

        Specification<ServiceRequest> specs =
                GenericSpecification.hasKeyword(keyword, Set.of("title"));

        Page<ServiceRequest> servicePage = keyword != null
                ? this.serviceRequestRepo.findAll(Specification.where(specs).and((root, query, criteriaBuilder) ->
                criteriaBuilder.notEqual(root.get("profile").get("id"), pageAndFilterDTO.getAuthId())), pageAndFilterDTO.getPageRequest())
                : this.serviceRequestRepo.findAllExceptAuthUser(pageAndFilterDTO.getAuthId(), pageAndFilterDTO.getPageRequest());

        List<ExtendedServiceRequestDTO.WithProfile> extendedService = servicePage.stream()
                .map(this::mapToExtendedServiceRequestDTO)
                .collect(Collectors.toList());

        return PaginationHelper.getResponse(servicePage, extendedService);
    }

    // Internal method to map ServiceRequest to ExtendedServiceRequestDTO
    private ExtendedServiceRequestDTO.WithProfile mapToExtendedServiceRequestDTO(ServiceRequest serviceRequest) {
        if (serviceRequest == null) {
            return null;
        }

        var serviceManagement = serviceRepo.findAllByServiceRequestId(serviceRequest.getId());

        if (serviceManagement == null) {
            throw new IllegalArgumentException("ServiceManagement is null for ServiceRequest ID: " + serviceRequest.getId());
        }

//        serviceManagement = this.serviceRepo.findById(serviceManagement.getId())
//                .orElseThrow();

        UUID categoryId = null;

        if (serviceManagement.getCategory() != null) {
            categoryId = serviceManagement.getCategory().getId();
        }

        return new ExtendedServiceRequestDTO.WithProfile(
                serviceRequest.getId(),
                EntityMapper.mapToResponse(serviceManagement.getServiceOffer(), ServiceOfferDTO.class),
                EntityMapper.mapToResponse(serviceManagement.getServiceRequest(), ServiceRequestDTO.class),
                EntityMapper.mapToResponse(serviceManagement.getProfile(), ProfileDTO.class),
                serviceManagement.getTitle(),
                serviceManagement.getEmploymentType(),
                serviceManagement.getDescription(),
                serviceManagement.getDescription1(),
                serviceManagement.getDescription2(),
                serviceManagement.getDescription3(),
                serviceManagement.getLanguageSpoken(),
                serviceManagement.getLocation(),
                EntityMapper.mapToResponse(serviceManagement.getCategory(), CategoryDTO.class),
                serviceManagement.getPrice(),
                serviceManagement.getPriceUnit()
        );
    }
}