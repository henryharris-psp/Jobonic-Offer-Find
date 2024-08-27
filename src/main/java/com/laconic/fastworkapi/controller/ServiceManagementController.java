package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ExtendedServiceRequestDTO;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceFilterDTO;
import com.laconic.fastworkapi.dto.ServiceRequestDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.ServiceManagement;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IManagementService;
import com.laconic.fastworkapi.service.IOfferService;
import com.laconic.fastworkapi.service.IRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "service", description = "Service related APIs")
@RestController
@RequestMapping("/api/v1/service")
public class ServiceManagementController {
    private final IManagementService managementService;
    private final IOfferService offerService;
    private final IRequestService requestService;

    @Autowired
    public ServiceManagementController(IManagementService managementService, IOfferService offerService, IRequestService requestService) {
        this.managementService = managementService;
        this.offerService = offerService;
        this.requestService = requestService;
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.SAVE_SERVICE)
    @PostMapping
    public ServiceDTO.WithProfile create(@RequestBody ServiceDTO serviceDTO) {
        return this.managementService.save(serviceDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.DELETE_SERVICE)
    @DeleteMapping
    public String delete(@RequestParam UUID id) {
        return this.managementService.remove(id);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.GET_ALL)
    @PostMapping("/offer/all")
    public PaginationDTO<ServiceDTO.WithProfile> getAllServices(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.managementService.getAllServices(pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.GET_ALL_BY_USER)
    @GetMapping("/user")
    public List<ServiceDTO.WithProfile> getAllByUser(@RequestParam Long profileId) {
        return this.managementService.getAllByUser(profileId);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.GET_ALL_BY_ID)
    @GetMapping("/get")
    public ServiceDTO.WithProfile getById(@RequestParam UUID serviceId) {
        return this.managementService.getById(serviceId);
    }


    @Operation(summary = APIDocsHelper.ServiceAPI.DELETE_OFFER)
    @DeleteMapping("/offer")
    public String deleteOffer(@RequestParam UUID serviceOfferId) {
        return this.offerService.remove(serviceOfferId);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.UPDATE_OFFER)
    @PutMapping("/offer/update")
    public ServiceDTO.WithProfile updateService(@RequestBody ServiceDTO serviceDTO) {
        return this.managementService.updateService(serviceDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.UPDATE_REQUEST)
    @PutMapping("/request/update")
    public ServiceRequestDTO updateServiceRequest(@RequestBody ServiceRequestDTO serviceRequestDTO) {
        return this.requestService.updateServiceRequest(serviceRequestDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.DELETE_REQUEST)
    @DeleteMapping("/request")
    public String deleteRequest(@RequestParam UUID serviceRequestId) {
        return this.requestService.remove(serviceRequestId);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.UPDATE_REQUEST)
    @PutMapping("/updateRequest")
    public ServiceRequestDTO updateRequest(@RequestParam UUID serviceRequestId,
                                           @RequestBody ServiceRequestDTO serviceRequestDTO) {
        return this.requestService.update(serviceRequestId, serviceRequestDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.FILTER_SERVICE)
    @PostMapping("/filter")
    public List<ServiceManagement> filterService(@RequestBody ServiceFilterDTO serviceFilterDTO) {
        return managementService.getFilterByPriceAndDate(serviceFilterDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.GET_ALL_REQUEST_SERVICE)
    @PostMapping("/request/all")
    public PaginationDTO<ExtendedServiceRequestDTO> getAllRequestServices(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.managementService.getAllExtendedRequestService(pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.FILTER_SERVICES)
    @PostMapping("/filters")
    public PaginationDTO<ServiceDTO.WithProfile> filterServices(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.managementService.filterServices(categoryId, minPrice, maxPrice, pageAndFilterDTO);
    }

    @Operation(summary = APIDocsHelper.ServiceAPI.GET_ALL_REQUEST)
    @PostMapping("request/all/page")
    public PaginationDTO<ServiceRequestDTO> getAllServiceRequests(@RequestParam(required = false) Long profileId, @RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.managementService.getAllServiceRequests(profileId, pageAndFilterDTO);
    }
}
