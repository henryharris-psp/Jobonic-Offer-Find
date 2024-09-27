package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.PaymentOut;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentOutDTO {

    private UUID id;
    private UUID checkpointId;
    private UUID contractId;
    private List<Long> acceptBy;
    private Long profileId;
    private Double price;

    public PaymentOutDTO(PaymentOut agreement) {
        this.id = agreement.getId();
        this.checkpointId = agreement.getCheckpoint().getId();
        this.contractId = agreement.getContract().getId();
        this.acceptBy = agreement.getAcceptBy();
        this.profileId = agreement.getProfile().getId();
        this.price = agreement.getPrice();
    }
}
