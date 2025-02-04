package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.CheckResponseDTO;
import com.laconic.fastworkapi.dto.CheckpointDTO;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.entity.Contract;
import com.laconic.fastworkapi.entity.Payment;
import com.laconic.fastworkapi.enums.PayableType;
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.*;
import com.laconic.fastworkapi.service.ICheckpointService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class CheckpointService implements ICheckpointService {
    private final ICheckpointRepo checkpointRepo;
    private final IServiceRepo serviceRepo;
    private final IMatchesRepo matchesRepo;
    private final IContractRepo contractRepo;
    private final PaymentRepo paymentRepo;

    public CheckpointService(ICheckpointRepo checkpointRepo, IServiceRepo serviceRepo, IMatchesRepo matchesRepo, IContractRepo contractRepo, PaymentRepo paymentRepo) {
        this.checkpointRepo = checkpointRepo;
        this.serviceRepo = serviceRepo;
        this.matchesRepo = matchesRepo;
        this.contractRepo = contractRepo;
        this.paymentRepo = paymentRepo;
    }

//    @Override
//    public CheckpointDTO save(CheckpointDTO checkpointDTO) {
//        var service = this.serviceRepo.findById(checkpointDTO.getServiceId())
//                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
//                        checkpointDTO.getServiceId().toString()));
//
//        var matches = this.matchesRepo.findByServiceId(checkpointDTO.getServiceId());
////        if (matches.getNumberOfCheckpointsLeft() <= 0) {
////            throw new NotFoundException("No checkpoints left for this match.");
////        }
////        // Reduce the number of checkpoints left
////        matches.setNumberOfCheckpointsLeft(matches.getNumberOfCheckpointsLeft() - 1);
//        this.matchesRepo.save(matches);
//        var checkpoint = EntityMapper.mapToEntity(checkpointDTO, Checkpoint.class);
//        checkpoint.setService(service);
//        var savedCheckpoint = this.checkpointRepo.save(checkpoint);
//        return EntityMapper.mapToEntity(savedCheckpoint, CheckpointDTO.class);
//    }

    @Override
    @Transactional
    public CheckpointDTO save(CheckpointDTO checkpointDTO) throws IOException {
        // Retrieve associated service
        var service = this.serviceRepo.findById(checkpointDTO.getServiceId())
                .orElseThrow(() -> new NotFoundException("Service not found with ID: " + checkpointDTO.getServiceId()));

        var matches = this.matchesRepo.findById(checkpointDTO.getMatchId())
                .orElseThrow(() -> new NotFoundException("Match not found with ID: " + checkpointDTO.getMatchId()));

        // Retrieve contract safely
        Contract contract = contractRepo.findById(checkpointDTO.getContractId())
                .orElseThrow(() -> new NotFoundException("Contract not found with ID: " + checkpointDTO.getContractId()));

        // Map DTO to entity
        Checkpoint checkpoint = new Checkpoint();

        checkpoint.setTitle(checkpointDTO.getTitle());
        checkpoint.setService(service);
        checkpoint.setMatches(matches);
        checkpoint.setPrice(checkpointDTO.getPrice());
        checkpoint.setNumberOfHoursCompleted(checkpointDTO.getNumberOfHoursCompleted());
        checkpoint.setDescription(checkpointDTO.getDescription());
        checkpoint.setContract(contract);
        checkpoint.setTasks(checkpointDTO.getTasks());
        checkpoint.setStatus("not_started");

        var savedCheckpoint = this.checkpointRepo.save(checkpoint);

        return new CheckpointDTO(savedCheckpoint);
    }

    @Override
    public CheckpointDTO update(UUID id, CheckpointDTO checkpointDTO) {
        var existingCheckpoint = this.checkpointRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CHECKPOINT, "id", id.toString()));

        if(checkpointDTO.getServiceId() != null) {
            var service = this.serviceRepo.findById(checkpointDTO.getServiceId())
                    .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                            checkpointDTO.getServiceId().toString()));

            existingCheckpoint.setService(service);
        }

        if(checkpointDTO.getContractId() != null) {
            var contract = this.contractRepo.findById(checkpointDTO.getContractId())
                    .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CONTRACT, "id",
                            checkpointDTO.getContractId().toString()));

            existingCheckpoint.setContract(contract);
        }

        if (checkpointDTO.getPrice() != 0) {
            existingCheckpoint.setPrice(checkpointDTO.getPrice());
        }

        if (checkpointDTO.getNumberOfHoursCompleted() != 0) {
            existingCheckpoint.setNumberOfHoursCompleted(checkpointDTO.getNumberOfHoursCompleted());
        }

        if (checkpointDTO.getDescription() != null) {
            existingCheckpoint.setDescription(checkpointDTO.getDescription());
        }

        if (checkpointDTO.getStatus() != null) {
            existingCheckpoint.setStatus(checkpointDTO.getStatus());
        }

        var updatedCheckpoint = this.checkpointRepo.save(existingCheckpoint);

        return new CheckpointDTO(updatedCheckpoint);
    }

    @Override
    public CheckResponseDTO getById(UUID id) {
        var existingCheckpoint = getCheckpoint(id);

        CheckResponseDTO checkResponseDTO = new CheckResponseDTO(existingCheckpoint);

        List<Payment> payment = paymentRepo.findPaymentByPayableIdAndPayableType(id, PayableType.CHECKPOINT);

        if(!payment.isEmpty()) checkResponseDTO.setPayment(payment.getFirst());

        return checkResponseDTO;
    }

    @Override
    public List<CheckResponseDTO> getAll() {
        return checkpointRepo.findAll().stream().map(checkpoint -> {
            CheckResponseDTO checkResponseDTO = new CheckResponseDTO(checkpoint);

            List<Payment> payment = paymentRepo.findPaymentByPayableIdAndPayableType(checkpoint.getId(), PayableType.CHECKPOINT);

            if(!payment.isEmpty()) checkResponseDTO.setPayment(payment.getFirst());

            return checkResponseDTO;
        }).toList();
    }

    @Override
    public String delete(UUID id) {
        var existingCheckpoint = getCheckpoint(id);
        existingCheckpoint.setActive(false);
        this.checkpointRepo.save(existingCheckpoint);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.CHECKPOINT);
    }

    @Override
    public List<CheckResponseDTO> getCheckPointByServiceId(UUID serviceId) {
        return this.checkpointRepo.findCheckpointByServiceId(serviceId).stream().map(CheckResponseDTO::new).toList();
    }

    public Checkpoint getCheckpoint(UUID id) {
        return this.checkpointRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CHECKPOINT, "id",
                id.toString()));
    }

    @Override
    public List<Checkpoint> getCheckPointByMatchesId(UUID matchesId) {
        return checkpointRepo.findCheckpointByMatchesId(matchesId);
    }

    @Override
    public List<Checkpoint> getCheckPointByContractIdIn(List<UUID> contractId) {
        return checkpointRepo.findCheckpointByContractIdIn(contractId);
    }
}