package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.FreelancerReceiptDTO;

import java.util.UUID;

public interface IFreelancerReceiptService {
    Object saveFreelancerReceiptPayment(FreelancerReceiptDTO receiptDTO);

    Object getFreelancerReceiptFromCheckPoint(UUID checkPointId);
}
