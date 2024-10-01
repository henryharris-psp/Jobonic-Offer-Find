package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Payment;
import com.laconic.fastworkapi.enums.PayableType;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDTO {

    private UUID id;
    private String paymentMethod;
    private Double amount;
    private Date paymentDate;

    private PayableType payableType;
    private UUID payableId;
    private String remarks;
    private Long senderId; // profile Id
    private Long receiverId; // profileId


    public PaymentDTO(Payment payment) {
        this.id = payment.getId();
        this.paymentMethod = payment.getPaymentMethod();
        this.amount = payment.getAmount();
        this.paymentDate = payment.getPaymentDate();
        this.payableType = payment.getPayableType();
        this.payableId = payment.getPayableId();
        this.remarks = payment.getRemarks();
        this.senderId = payment.getSenderId().getId();
        this.receiverId = payment.getReceiverId().getUserId();
    }

    public record PaymentSearchDTO(UUID payableId, PayableType payableType,
                                   int pageNumber, int pageSize) {
    }
}
