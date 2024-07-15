package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.FreelancerReceipt;
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
public class FreelancerReceiptDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -9025312274634384927L;
    private UUID id;
    private UUID paymentId;
    private LocalDate releaseDate;
    private double releaseAmount = 0;

    public FreelancerReceiptDTO(FreelancerReceipt freelancerReceipt) {
        this.id = freelancerReceipt.getId();
        this.paymentId = freelancerReceipt.getPaymentId();
        this.releaseDate = freelancerReceipt.getReleaseDate();
        this.releaseAmount = freelancerReceipt.getReleaseAmount();
    }
}
