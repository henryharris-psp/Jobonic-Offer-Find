package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.entity.Matches;
import com.laconic.fastworkapi.enums.PaymentMode;
import com.laconic.fastworkapi.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    private double paymentTotal = 0;
//    private int numberOfCheckpoints = 0;
//    private int numberOfCheckpointsLeft = 0;
    private PaymentMode paymentMode;
    private Status status;

    private List<UUID> checkPointList;

    public MatchesDTO(Matches matches) {
        this.id = matches.getId();
        this.profileId = matches.getProfile().getId();
        this.serviceId = matches.getService().getId();
        this.paymentTotal = matches.getPaymentTotal();
//        this.numberOfCheckpoints = matches.getNumberOfCheckpoints();
//        this.numberOfCheckpointsLeft = matches.getNumberOfCheckpointsLeft();
        this.paymentMode = matches.getPaymentMode();
        this.status = matches.getStatus();
        //@soe, added list of checkpoint Id in match
        this.checkPointList = matches.getCheckpoints().stream()
                .map(Checkpoint::getId)
                .collect(Collectors.toList());
    }
}