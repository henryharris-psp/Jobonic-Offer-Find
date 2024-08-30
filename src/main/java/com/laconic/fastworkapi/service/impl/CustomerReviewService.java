package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.CustomerReviewDTO;
import com.laconic.fastworkapi.entity.CustomerReview;
import com.laconic.fastworkapi.entity.Matches;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.repo.ICustomerReviewRepo;
import com.laconic.fastworkapi.repo.IMatchesRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.ICustomerReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CustomerReviewService implements ICustomerReviewService {

    private final ICustomerReviewRepo repository;

    private final IUserRepo userRepo;

    private final IMatchesRepo matchesRepository; // Repository for Matches entity

    public CustomerReviewService(ICustomerReviewRepo repository, IUserRepo userRepo, IMatchesRepo matchesRepository) {
        this.repository = repository;
        this.userRepo = userRepo;
        this.matchesRepository = matchesRepository;
    }

    /**
     * @Author soe
     * @Note save method for customer review
     */
    @Override
    public CustomerReviewDTO save(CustomerReviewDTO dto) {

        CustomerReview customerReview = mapToEntity(dto);
        customerReview = repository.save(customerReview);

        return mapToDTO(customerReview);
    }

    /**
     * @Author soe
     * @Note find customer review with customer review id
     */
    @Override
    public CustomerReviewDTO findById(UUID id) {

        CustomerReview customerReview = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer review not found"));

        return mapToDTO(customerReview);
    }

    /**
     * @Author soe
     * @Note find all for customer review
     */
    @Override
    public List<CustomerReviewDTO> findAll() {

        return repository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * @Author soe
     * @Note update method for customer review
     */
    @Override
    public CustomerReviewDTO update(CustomerReviewDTO dto) {

        if (dto.getId() == null || !repository.existsById(dto.getId())) {
            throw new RuntimeException("Customer review not found or ID is missing");
        }

        // Fetch the existing entity from the database
        CustomerReview existingReview = repository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Customer review not found"));

        // Update the fields
        existingReview.setNoOfStar(dto.getNoOfStar());
        existingReview.setReview(dto.getReview());

        // Set Profile entity if profileId is provided
        if (dto.getProfileId() != null) {
            Profile profile = userRepo.findById(dto.getProfileId())
                    .orElseThrow(() -> new RuntimeException("Profile entity not found"));
            existingReview.setProfile(profile);
        } else {
            existingReview.setProfile(existingReview.getProfile()); // If profile id is null from incoming dto, profile will be old one from database.
        }

        // Set Matches entity if matchesId is provided
        if (dto.getMatchesId() != null) {
            Matches matches = matchesRepository.findById(dto.getMatchesId())
                    .orElseThrow(() -> new RuntimeException("Matches entity not found"));
            existingReview.setMatches(matches);
        } else {
            existingReview.setMatches(existingReview.getMatches()); // If mathches id is null from incoming dto, matches will be old one from database.
        }

        // Save the updated entity
        CustomerReview updatedReview = repository.save(existingReview);

        return mapToDTO(updatedReview);
    }

    /**
     * @Author soe
     * @Note delete method for customer review
     */
    @Override
    public void deleteById(UUID id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Customer review not found");
        }
        repository.deleteById(id);
    }

    /**
     * @Author soe
     * @Note covert DTO to Entity
     */
    private CustomerReview mapToEntity(CustomerReviewDTO dto) {

        CustomerReview customerReview = new CustomerReview();
        customerReview.setId(dto.getId());
        customerReview.setNoOfStar(dto.getNoOfStar());
        customerReview.setReview(dto.getReview());

        if (dto.getProfileId() != null) {
            Profile profile = userRepo.findById(dto.getProfileId())
                    .orElseThrow(() -> new RuntimeException("Profile entity not found"));
            customerReview.setProfile(profile);
        }

        if (dto.getMatchesId() != null) {
            Matches matches = matchesRepository.findById(dto.getMatchesId())
                    .orElseThrow(() -> new RuntimeException("Matches entity not found"));
            customerReview.setMatches(matches);
        }

        return customerReview;
    }

    /**
     * @Author soe
     * @Note convert Entity to DTO
     */
    private CustomerReviewDTO mapToDTO(CustomerReview customerReview) {

        CustomerReviewDTO dto = new CustomerReviewDTO();
        dto.setId(customerReview.getId());
        dto.setNoOfStar(customerReview.getNoOfStar());
        dto.setReview(customerReview.getReview());

        if (customerReview.getProfile() != null) {
            dto.setProfileId(customerReview.getProfile().getId());
        }

        if (customerReview.getMatches() != null) {
            dto.setMatchesId(customerReview.getMatches().getId());
        }

        return dto;
    }
}
