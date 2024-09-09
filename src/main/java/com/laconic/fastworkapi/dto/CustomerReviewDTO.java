package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.CustomerReview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CustomerReviewDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 7113949934875848406L;
    private UUID id;

    private double noOfStar = 0.0;

    private String review;

    private boolean isActive = true;

    private Long profileId;
    private UUID matchId;

    public CustomerReviewDTO(CustomerReview customerReview) {
        this.id = customerReview.getId();
        this.noOfStar = customerReview.getNoOfStar();
        this.review = customerReview.getReview();
        this.isActive = customerReview.isActive();
        this.profileId = customerReview.getProfile().getId();
        this.matchId = customerReview.getMatches().getId();
    }
}
