package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.enums.PayableType;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class PaymentResponseDTO {
    private UUID id;
    private String paymentMethod;
    private Double amount;
    private Date paymentDate;
    private PayableType payableType;
    private UUID payableId;
    private String remarks;
    private UserProfileDTO senderId;
    private UserProfileDTO receiverId;

    public PaymentResponseDTO(UUID id, String paymentMethod, Double amount, Date paymentDate, PayableType payableType, UUID payableId, String remarks, UserProfileDTO senderId, UserProfileDTO receiverId) {
        this.id = id;
        this.paymentMethod = paymentMethod;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.payableType = payableType;
        this.payableId = payableId;
        this.remarks = remarks;
        this.senderId = senderId;
        this.receiverId = receiverId;
    }
}
