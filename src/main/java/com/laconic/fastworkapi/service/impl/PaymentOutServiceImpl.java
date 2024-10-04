package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.PaymentOutDTO;
import com.laconic.fastworkapi.entity.PaymentOut;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.repo.IContractRepo;
import com.laconic.fastworkapi.repo.IPaymentOutRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.PaymentOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentOutServiceImpl implements PaymentOutService {

    private final IPaymentOutRepo paymentAgreementRepo;
    private final ICheckpointRepo checkpointRepo;
    private final IContractRepo contractRepo;
    private final IUserRepo userRepo;

    private UUID set(PaymentOut paymentOut, PaymentOutDTO dto) {
        paymentOut.setContract(contractRepo.findById(dto.getContractId()).get());
        paymentOut.setCheckpoint(checkpointRepo.findById(dto.getCheckpointId()).get());
        paymentOut.setProfile(userRepo.findById(dto.getProfileId()).get());
        paymentOut.setAcceptBy(dto.getAcceptBy());
        paymentOut.setPrice(dto.getPrice());
        return paymentAgreementRepo.save(paymentOut).getId();
    }

    @Override
    public UUID save(PaymentOutDTO dto) {
        return set(new PaymentOut(), dto);
    }

    @Override
    public UUID update(UUID id, PaymentOutDTO dto) {
        PaymentOut agreement = getByIdByRepo(id);
        return set(agreement, dto);
    }

    private PaymentOut getByIdByRepo(UUID id) {
        return paymentAgreementRepo.findById(id).get();
    }

    @Override
    public List<PaymentOutDTO> getAll() {
        return paymentAgreementRepo.findAll().stream().map(PaymentOutDTO::new).toList();
    }

    @Override
    public PaymentOutDTO getById(UUID id) {
        return new PaymentOutDTO(getByIdByRepo(id));
    }

    @Override
    public String delete(UUID id) {
        paymentAgreementRepo.deleteById(id);
        return "Deleted";
    }
}
