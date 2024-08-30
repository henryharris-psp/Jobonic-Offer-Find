package com.laconic.fastworkapi.dto;

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

    private UUID matchesId;
}
