package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.CheckpointDTO;

import java.util.List;
import java.util.UUID;

public interface ICheckpointService {
    CheckpointDTO save(CheckpointDTO checkpointDTO);

    CheckpointDTO update(UUID id, CheckpointDTO checkpointDTO);

    CheckpointDTO getById(UUID id);

    List<CheckpointDTO> getAll();

    String delete(UUID id);
}