package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.entity.Contract;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContractDTO {

    private UUID id;
    private UUID matchesId;
    private Double price;
    private String deliverable;
    private Boolean isFreelancerConfirmed;
    private Boolean isEmployerConfirmed;
    @JsonIgnore
    private UUID createdBy;
    @JsonIgnore
    private Instant createdDate;

    public ContractDTO(Contract contract) {
        this.id = contract.getId();
        this.matchesId = contract.getMatches().getId();
        this.price = contract.getPrice();
        this.deliverable = contract.getDeliverable();
        this.isFreelancerConfirmed = contract.getIsFreelancerConfirmed();
        this.isEmployerConfirmed = contract.getIsFreelancerConfirmed();
        this.createdBy = contract.getCreatedBy();
        this.createdDate = contract.getCreatedDate();
    }
}
