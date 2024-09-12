package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.FreelancerReceiptDTO;
import com.laconic.fastworkapi.entity.FreelancerReceipt;
import com.laconic.fastworkapi.repo.IFreelancerReceiptRepo;
import com.laconic.fastworkapi.service.IFreelancerReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FreelancerReceiptService implements IFreelancerReceiptService {

    private final IFreelancerReceiptRepo freelancerReceiptRepo;

    @Override
    public Object saveFreelancerReceiptPayment(FreelancerReceiptDTO receiptDTO) {
        FreelancerReceipt freelancerReceipt = FreelancerReceipt.builder()
                .serviceId(receiptDTO.getServiceId())
                .paymentId(receiptDTO.getPaymentId())
                .checkPointId(receiptDTO.getCheckPointId())
                .profileId(receiptDTO.getProfileId())
                .releaseDate(receiptDTO.getReleaseDate())
                .toAccountNumber(receiptDTO.getToAccountNumber())
                .releaseAmount(receiptDTO.getReleaseAmount())
                .build();
        freelancerReceiptRepo.save(freelancerReceipt);
        return "Success";
    }

    @Override
    public Object getFreelancerReceiptFromCheckPoint(UUID checkPointId) {
        return freelancerReceiptRepo.findFreelancerReceiptByCheckPointId(checkPointId);
    }
}
