package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.PaymentAgreementDTO;
import com.laconic.fastworkapi.entity.PaymentAgreement;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.repo.IContractRepo;
import com.laconic.fastworkapi.repo.IPaymentAgreementRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.PaymentAgreementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentAgreementServiceImpl implements PaymentAgreementService {

    private final IPaymentAgreementRepo paymentAgreementRepo;
    private final ICheckpointRepo checkpointRepo;
    private final IContractRepo contractRepo;
    private final IUserRepo userRepo;

    private UUID set(PaymentAgreement paymentAgreement, PaymentAgreementDTO dto) {
        paymentAgreement.setContract(contractRepo.findById(dto.getContractId()).get());
        paymentAgreement.setCheckpoint(checkpointRepo.findById(dto.getCheckpointId()).get());
        paymentAgreement.setProfile(userRepo.findById(dto.getProfileId()).get());
        paymentAgreement.setAcceptBy(dto.getAcceptBy());
        paymentAgreement.setPrice(dto.getPrice());
        return paymentAgreementRepo.save(paymentAgreement).getId();
    }

    @Override
    public UUID save(PaymentAgreementDTO dto) {
        return set(new PaymentAgreement(), dto);
    }

    @Override
    public UUID update(UUID id, PaymentAgreementDTO dto) {
        PaymentAgreement agreement = getByIdByRepo(id);
        return set(agreement, dto);
    }

    private PaymentAgreement getByIdByRepo(UUID id) {
        return paymentAgreementRepo.findById(id).get();
    }

    @Override
    public List<PaymentAgreementDTO> getAll() {
        return paymentAgreementRepo.findAll().stream().map(PaymentAgreementDTO::new).toList();
    }

    @Override
    public PaymentAgreementDTO getById(UUID id) {
        return new PaymentAgreementDTO(getByIdByRepo(id));
    }

}
