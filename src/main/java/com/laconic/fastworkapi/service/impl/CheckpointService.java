package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.CheckpointDTO;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.repo.IMatchesRepo;
import com.laconic.fastworkapi.repo.IServiceRepo;
import com.laconic.fastworkapi.service.ICheckpointService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CheckpointService implements ICheckpointService {
    private final ICheckpointRepo checkpointRepo;
    private final IServiceRepo serviceRepo;
    private final IMatchesRepo matchesRepo;

    public CheckpointService(ICheckpointRepo checkpointRepo, IServiceRepo serviceRepo, IMatchesRepo matchesRepo) {
        this.checkpointRepo = checkpointRepo;
        this.serviceRepo = serviceRepo;
        this.matchesRepo = matchesRepo;
    }

    @Override
    public CheckpointDTO save(CheckpointDTO checkpointDTO) {
        var service = this.serviceRepo.findById(checkpointDTO.getServiceId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        checkpointDTO.getServiceId().toString()));

        var matches = this.matchesRepo.findByServiceId(checkpointDTO.getServiceId());
        if (matches.getNumberOfCheckpointsLeft() <= 0) {
            throw new NotFoundException("No checkpoints left for this match.");
        }
        // Reduce the number of checkpoints left
        matches.setNumberOfCheckpointsLeft(matches.getNumberOfCheckpointsLeft() - 1);
        this.matchesRepo.save(matches);
        var checkpoint = EntityMapper.mapToEntity(checkpointDTO, Checkpoint.class);
        checkpoint.setService(service);
        var savedCheckpoint = this.checkpointRepo.save(checkpoint);
        return EntityMapper.mapToEntity(savedCheckpoint, CheckpointDTO.class);
    }


    @Override
    public CheckpointDTO update(UUID id, CheckpointDTO checkpointDTO) {
        var existingCheckpoint = this.checkpointRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CHECKPOINT, "id", id.toString()));

        var service = this.serviceRepo.findById(checkpointDTO.getServiceId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        checkpointDTO.getServiceId().toString()));

        existingCheckpoint.setService(service);
        existingCheckpoint.setPrice(checkpointDTO.getPrice());
        existingCheckpoint.setNumberOfHoursCompleted(checkpointDTO.getNumberOfHoursCompleted());
        existingCheckpoint.setDescription(checkpointDTO.getDescription());

        var updatedCheckpoint = this.checkpointRepo.save(existingCheckpoint);
        return EntityMapper.mapToEntity(updatedCheckpoint, CheckpointDTO.class);
    }

    @Override
    public CheckpointDTO getById(UUID id) {
        var existingCheckpoint = getCheckpoint(id);
        return new CheckpointDTO(existingCheckpoint);
    }

    @Override
    public List<CheckpointDTO> getAll() {
        return this.checkpointRepo.findAll().stream().map(CheckpointDTO::new).toList();
    }

    @Override
    public String delete(UUID id) {
        var existingCheckpoint = getCheckpoint(id);
        existingCheckpoint.setActive(false);
        this.checkpointRepo.save(existingCheckpoint);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.CHECKPOINT);
    }

    private Checkpoint getCheckpoint(UUID id) {
        return this.checkpointRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CHECKPOINT, "id",
                id.toString()));
    }
}