package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Contract;
import com.laconic.fastworkapi.entity.PaymentOut;
import lombok.*;

import java.time.Instant;
import java.util.Comparator;
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

    private CheckResponseDTO currentCheckpoint;

    private List<PaymentOutDTO> payoutNegotiations;

    public ContractResponseDTO(Contract contract) {
        this.id = contract.getId();
        this.matchesId = contract.getMatches().getId();
        this.price = contract.getPrice();
        this.deliverable = contract.getDeliverable();
        this.acceptBy = contract.getAcceptBy();
        this.createdBy = contract.getCreatedBy();
        this.createdDate = contract.getCreatedDate();
        this.profileId=contract.getProfile().getId();
        this.currentCheckpoint = contract.getCurrentCheckpoint() != null ? new CheckResponseDTO(contract.getCurrentCheckpoint()) : null;
        this.payoutNegotiations = contract.getPaymentOuts().stream()
            .sorted(Comparator.comparing(PaymentOut::getCreatedDate).reversed())
            .map(PaymentOutDTO::new)
            .toList();
    }
}