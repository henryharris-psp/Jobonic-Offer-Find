package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.dto.EmployerPaymentDTO;
import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployerPayment  extends Auditable<UUID> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private UUID id;

    @Column(nullable = false)
    private UUID serviceId;

    @ManyToOne
    private Profile clientId;

    @ManyToOne
    private Profile freelancerId;

    @Column
    private String paymentMethod;

    @Column
    private Long cardNumber;

    @Column
    private Long cardExpiryDate;

    @Column
    private Long cardCvv;

    @Column
    private String bankAccountNumber;

    @Column
    private String bankAccountHolderName;

    private double amount;

    private double remainingAmount;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate paymentDate;

    private String status;

    public EmployerPayment(EmployerPaymentDTO employerPaymentData) {
        super();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public double getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(double remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getBankAccountHolderName() {
        return bankAccountHolderName;
    }

    public void setBankAccountHolderName(String bankAccountHolderName) {
        this.bankAccountHolderName = bankAccountHolderName;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public Long getCardCvv() {
        return cardCvv;
    }

    public void setCardCvv(Long cardCvv) {
        this.cardCvv = cardCvv;
    }

    public Long getCardExpiryDate() {
        return cardExpiryDate;
    }

    public void setCardExpiryDate(Long cardExpiryDate) {
        this.cardExpiryDate = cardExpiryDate;
    }

    public Long getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Profile getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(Profile freelancerId) {
        this.freelancerId = freelancerId;
    }

    public Profile getClientId() {
        return clientId;
    }

    public void setClientId(Profile clientId) {
        this.clientId = clientId;
    }

    public UUID getServiceId() {
        return serviceId;
    }

    public void setServiceId(UUID serviceId) {
        this.serviceId = serviceId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
