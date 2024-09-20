package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.EmployerPayment;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor

@AllArgsConstructor
@Getter
@Setter
@Data
public class EmployerPaymentDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -5595001474187733297L;
    private UUID id;
    private UUID serviceId;
    private Long clientId;
    private Long freelancerId;
    private String paymentMethod;
    private Long cardNumber;
    private Long cardExpiryDate;
    private Long cardCvv;
    private String bankAccountNumber;
    private String bankAccountHolderName;
    private double amount;
    private double remainingAmount = 0;
    private LocalDate paymentDate;

    public EmployerPaymentDTO(EmployerPayment employerPayment) {
        this.id = employerPayment.getId();
        this.serviceId = employerPayment.getServiceId();
        this.clientId = employerPayment.getClientId().getId();
        this.freelancerId = employerPayment.getFreelancerId().getId();
        this.paymentMethod = employerPayment.getPaymentMethod();
        this.cardNumber = employerPayment.getCardNumber();
        this.cardExpiryDate = employerPayment.getCardExpiryDate();
        this.cardCvv = employerPayment.getCardCvv();
        this.bankAccountNumber = employerPayment.getBankAccountNumber();
        this.bankAccountHolderName = employerPayment.getBankAccountHolderName();
        this.amount = employerPayment.getAmount();
        this.remainingAmount = employerPayment.getRemainingAmount();
        this.paymentDate = employerPayment.getPaymentDate();
    }
}
