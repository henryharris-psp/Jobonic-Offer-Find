package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.entity.Contract;
import lombok.*;

import java.time.Instant;
import java.util.List;
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

    private List<Long> acceptBy;
    @JsonIgnore
    private UUID createdBy;
    @JsonIgnore
    private Instant createdDate;
    private Long profileId;

    public ContractDTO(Contract contract) {
        this.id = contract.getId();
        this.matchesId = contract.getMatches().getId();
        this.price = contract.getPrice();
        this.deliverable = contract.getDeliverable();
//        this.isFreelancerConfirmed = contract.getIsFreelancerConfirmed();
//        this.isEmployerConfirmed = contract.getIsFreelancerConfirmed();
        this.createdBy = contract.getCreatedBy();
        this.createdDate = contract.getCreatedDate();
        this.acceptBy = contract.getAcceptBy();
        this.profileId=contract.getProfile().getId();
    }
}
