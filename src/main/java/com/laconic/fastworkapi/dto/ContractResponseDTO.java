package com.laconic.fastworkapi.dto;

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
public class ContractResponseDTO {

    private UUID id;

    private UUID matchesId;

    private Double price;

    private String deliverable;

    private List<Long> acceptBy;

    private UUID createdBy;

    private Instant createdDate;
    private List<CheckResponseDTO> milestones;
    private Long profileId;

    public ContractResponseDTO(Contract contract) {
        this.id = contract.getId();
        this.matchesId = contract.getMatches().getId();
        this.price = contract.getPrice();
        this.deliverable = contract.getDeliverable();
        this.acceptBy = contract.getAcceptBy();
        this.createdBy = contract.getCreatedBy();
        this.createdDate = contract.getCreatedDate();
        this.profileId=contract.getProfile().getId();
    }
}
