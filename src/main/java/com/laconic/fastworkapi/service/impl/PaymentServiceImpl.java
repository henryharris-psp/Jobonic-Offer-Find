package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.PaymentDTO;
import com.laconic.fastworkapi.dto.pagination.Pagination;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.entity.Payment;
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.repo.IMatchesRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.PaymentRepo;
import com.laconic.fastworkapi.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final IMatchesRepo matchesRepo;
    private final ICheckpointRepo checkpointRepo;
    private final IUserRepo userRepo;

    @Override
    public UUID save(PaymentDTO paymentDTO) {
        UUID payableId = switch (paymentDTO.getPayableType()) {
            case CHECKPOINT -> checkpointRepo.findById(paymentDTO.getPayableId())
                    .orElseThrow(() -> new NotFoundException("Checkpoint not found"))
                    .getId();
            case MATCHES -> matchesRepo.findById(paymentDTO.getPayableId())
                    .orElseThrow(() -> new NotFoundException("Matches not found"))
                    .getId();
            default -> throw new NotFoundException("Incorrect Payable type");
        };
        Long senderId = userRepo.findById(paymentDTO.getSenderId()).get().getId();
        Long receiverId = userRepo.findById(paymentDTO.getReceiverId()).get().getId();
        Payment payment = Payment.builder()
                .paymentMethod(paymentDTO.getPaymentMethod())
                .paymentDate(paymentDTO.getPaymentDate())
                .amount(paymentDTO.getAmount())
                .payableType(paymentDTO.getPayableType())
                .payableId(payableId)
                .remarks(paymentDTO.getRemarks())
                .senderId(senderId)
                .receiverId(receiverId)
                .build();
        return paymentRepo.save(payment).getId();
    }

    @Override
    public PaymentDTO getById(UUID id) {
        Payment payment = paymentRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException("Payment ", "id", id.toString()));
        return PaymentDTO.builder()
                .paymentMethod(payment.getPaymentMethod())
                .paymentDate(payment.getPaymentDate())
                .amount(payment.getAmount())
                .payableType(payment.getPayableType())
                .payableId(payment.getPayableId())
                .remarks(payment.getRemarks())
                .senderId(payment.getSenderId())
                .receiverId(payment.getReceiverId())
                .build();

    }

    @Override
    public PaginationDTO<PaymentDTO> filter(PaymentDTO.PaymentSearchDTO filterDTO) {
        var pageable = Pagination.getPageable(filterDTO.pageNumber(), filterDTO.pageSize(), "id", "DESC");
        Page<Payment> payments = null;
        if (Objects.nonNull(filterDTO.payableType()) && Objects.nonNull(filterDTO.payableId())) {
            payments = paymentRepo.findPaymentByPayableIdAndPayableTypeContainingIgnoreCase(filterDTO.payableId(), filterDTO.payableType(), pageable);
        } else {
            payments = paymentRepo.findAll(pageable);
        }
        return PaginationHelper.getResponse(payments, payments.getContent().stream().map(PaymentDTO::new).toList());
    }
}
