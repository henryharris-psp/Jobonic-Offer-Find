package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.EmployerPayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor

@AllArgsConstructor
@Getter
@Setter
public class EmployerPaymentDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -5595001474187733297L;
    private UUID id;
    private UUID serviceId;
    private UUID clientId;
    private UUID freelancerId;
    private double amount = 0;
    private double remainingAmount = 0;
    private LocalDate paymentDate;

    public EmployerPaymentDTO(EmployerPayment employerPayment) {
        this.id = employerPayment.getId();
        this.serviceId = employerPayment.getServiceId();
        this.clientId = employerPayment.getClient().getId();
        this.freelancerId = employerPayment.getFreelancer().getId();
        this.amount = employerPayment.getAmount();
        this.remainingAmount = employerPayment.getRemainingAmount();
        this.paymentDate = employerPayment.getPaymentDate();
    }
}
