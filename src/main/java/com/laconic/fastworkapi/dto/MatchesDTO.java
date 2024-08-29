package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Matches;
import com.laconic.fastworkapi.enums.PaymentMode;
import com.laconic.fastworkapi.enums.Status;
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
public class MatchesDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -8805087936102565403L;
    private UUID id;
    private UUID serviceId;
    private Long profileId;
    private String deliverable;
    private double paymentTotal = 0;
    //    private int numberOfCheckpoints = 0;
//    private int numberOfCheckpointsLeft = 0;
    private PaymentMode paymentMode;
    private Status status;

    public MatchesDTO(Matches matches) {
        this.id = matches.getId();
        this.profileId = matches.getProfile().getId();
        this.serviceId = matches.getService().getId();
        this.deliverable = matches.getDeliverable();
        this.paymentTotal = matches.getPaymentTotal();
//        this.numberOfCheckpoints = matches.getNumberOfCheckpoints();
//        this.numberOfCheckpointsLeft = matches.getNumberOfCheckpointsLeft();
        this.paymentMode = matches.getPaymentMode();
        this.status = matches.getStatus();
    }
}