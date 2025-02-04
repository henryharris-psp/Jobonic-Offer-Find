package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.CheckResponseDTO;
import com.laconic.fastworkapi.dto.CheckpointDTO;
import com.laconic.fastworkapi.entity.Checkpoint;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ICheckpointService {
    CheckpointDTO save(CheckpointDTO checkpointDTO) throws IOException;

    CheckpointDTO update(UUID id, CheckpointDTO checkpointDTO);

    CheckResponseDTO getById(UUID id);

    List<CheckResponseDTO> getAll();

    String delete(UUID id);

    List<CheckResponseDTO> getCheckPointByServiceId(UUID serviceId);

    Checkpoint getCheckpoint(UUID id);

    List<Checkpoint> getCheckPointByMatchesId(UUID matchesId);

    List<Checkpoint> getCheckPointByContractIdIn(List<UUID> contractId);
}