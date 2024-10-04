package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.PaymentDTO;
import com.laconic.fastworkapi.dto.PaymentResponseDTO;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.UserProfileDTO;
import com.laconic.fastworkapi.dto.pagination.Pagination;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.entity.Contract;
import com.laconic.fastworkapi.entity.Payment;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.repo.IContractRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.PaymentRepo;
import com.laconic.fastworkapi.service.IProfileService;
import com.laconic.fastworkapi.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final IContractRepo contractRepo;
    private final ICheckpointRepo checkpointRepo;
    private final IUserRepo userRepo;
    private final IProfileService profileService;

    @Override
    public ResponseEntity<?> save(PaymentDTO paymentDTO) {
        UUID payableId = switch (paymentDTO.getPayableType()) {
            case CHECKPOINT -> checkpointRepo.findById(paymentDTO.getPayableId())
                    .orElseThrow(() -> new NotFoundException("Checkpoint not found"))
                    .getId();
            case CONTRACT -> contractRepo.findById(paymentDTO.getPayableId())
                    .orElseThrow(() -> new NotFoundException("CONTRACT not found"))
                    .getId();
            default -> throw new NotFoundException("Incorrect Payable type");
        };
        
        Profile senderId = userRepo.findById(paymentDTO.getSenderId())
                .orElseThrow(() -> new NotFoundException("Sender not found"));

        Profile receiverId = userRepo.findById(paymentDTO.getReceiverId())
                .orElseThrow(() -> new NotFoundException("Receiver not found"));

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

        if ("CONTRACT".equalsIgnoreCase(String.valueOf(paymentDTO.getPayableType()))) {
            Contract contract = contractRepo.findById(paymentDTO.getPayableId())
                    .orElseThrow(() -> new NotFoundException("Contract not found"));

            Checkpoint checkpoint = checkpointRepo.findFirstByMatchesIdOrderByCreatedDateAsc(contract.getMatches().getId());

            checkpoint.setStatus("waiting_for_submission");
            checkpointRepo.save(checkpoint);

            contract.setCurrentCheckpoint(checkpoint);

            contractRepo.save(contract);
        } else if("CHECKPOINT".equalsIgnoreCase(String.valueOf(paymentDTO.getPayableType()))) {
            Checkpoint checkpoint = checkpointRepo.findById(paymentDTO.getPayableId())
                    .orElseThrow(() -> new NotFoundException("Checkpoint not found"));

            checkpoint.setStatus("paid");

            checkpointRepo.save(checkpoint);

            Contract contract = contractRepo.findById(checkpoint.getContract().getId())
                    .orElseThrow(() -> new NotFoundException("Contract not found"));

            List<Checkpoint> checkpoints = checkpointRepo.findCheckpointByContractIdIn(List.of(contract.getId()));

            Checkpoint lastCheckpoint = checkpoints.stream().filter(c -> c.getStatus().equalsIgnoreCase("waiting_for_submission")).findFirst().orElse(null);

            if (Objects.nonNull(lastCheckpoint)) {
                contract.setCurrentCheckpoint(lastCheckpoint);
            }

            contract.setCurrentCheckpoint(null);

            contractRepo.save(contract);
        }

        var paymentData = paymentRepo.save(payment);

        var data = new HashMap<String, Object>();
        data.put("id", "6fc1bf31-97ab-47ef-bd12-e45aa5cc59f2");
        data.put("apiSecret", "jj9QMGrIsGSQTxTvhPNT5yoUXQY4eLDbrzGDU8o3gMU=");
        data.put("currencyCode", "USD"); // Now Support (USD, THB)
        data.put("amount", paymentData.getAmount()); // This amount is number

        var payniUri = "http://api-payni.laconic.co.th/api/external/generate-redirect-url";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(payniUri, data, String.class);

        Object responseData = new HashMap<>();
        ((HashMap<String, Object>) responseData).put("paymentId", paymentData.getId());
        ((HashMap<String, Object>) responseData).put("payni", result);

        return ResponseEntity.ok(responseData);
    }

    @Override
    public PaymentResponseDTO getById(UUID id) {
        Payment payment = paymentRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException("Payment ", "id", id.toString()));

        UserProfileDTO sender = profileService.getUserProfileDto(payment.getSenderId().getId(), "profile");
        UserProfileDTO receiver = profileService.getUserProfileDto(payment.getReceiverId().getId(), "profile");

        return PaymentResponseDTO.builder()
                .id(payment.getId())
                .paymentMethod(payment.getPaymentMethod())
                .paymentDate(payment.getPaymentDate())
                .amount(payment.getAmount())
                .payableType(payment.getPayableType())
                .payableId(payment.getPayableId())
                .remarks(payment.getRemarks())
                .sender(sender)
                .receiver(receiver)
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
