package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.CustomerReviewDTO;
import com.laconic.fastworkapi.entity.CustomerReview;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.ICustomerReviewRepo;
import com.laconic.fastworkapi.repo.IMatchesRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.ICustomerReviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CustomerReviewService implements ICustomerReviewService {

    private final ICustomerReviewRepo repository;

    private final IUserRepo userRepo;

    private final IMatchesRepo matchesRepository;

    public CustomerReviewService(ICustomerReviewRepo repository, IUserRepo userRepo, IMatchesRepo matchesRepository) {
        this.repository = repository;
        this.userRepo = userRepo;
        this.matchesRepository = matchesRepository;
    }

    @Override
    public CustomerReviewDTO save(CustomerReviewDTO dto) {
        return map(new CustomerReview(), dto);
    }

    @Override
    public CustomerReviewDTO findById(UUID id) {
        CustomerReview customerReview = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer review not found"));

        return new CustomerReviewDTO(customerReview);
    }

    @Override
    public List<CustomerReviewDTO> findAll() {
        return repository.findAll().stream()
                .map(CustomerReviewDTO::new)
                .collect(Collectors.toList());
    }

    private List<CustomerReviewDTO> list(List<CustomerReview> customerReviews) {
        return customerReviews.stream()
                .map(CustomerReviewDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerReviewDTO update(CustomerReviewDTO dto) {
        CustomerReview existingReview = repository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Customer review not found"));
        return map(existingReview, dto);
    }


    @Override
    public String deleteById(UUID id) {

        var customerReview = repository.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CUSTOMER_REVIEW, "id", id.toString()));

        customerReview.setActive(false);
        this.repository.save(customerReview);

        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.CUSTOMER_REVIEW);
    }


    private CustomerReviewDTO map(CustomerReview customerReview, CustomerReviewDTO dto) {

        customerReview.setReview(dto.getReview());
        customerReview.setProfile(userRepo.findById(dto.getProfileId()).get());
        customerReview.setActive(true);
        customerReview.setNoOfStar(dto.getNoOfStar());
        customerReview.setReviewType(dto.getReviewType());

        if (Objects.nonNull(dto.getMatchId())) {
            customerReview.setMatches(matchesRepository.findById(dto.getMatchId()).get());
        }
        customerReview = repository.save(customerReview);
        return new CustomerReviewDTO(customerReview);
    }

    public List<CustomerReviewDTO> getReviewForFreelancer(UUID matchId) {
        List<CustomerReview> reviews = repository.getCustomerReviewByMatchesId(matchId);
        return list(reviews);
    }

    @Override
    public List<CustomerReviewDTO> getReviewBasedOnType(CustomerReview.ReviewType type) {
        return list(repository.getCustomerReviewByReviewType(type));
    }
}
