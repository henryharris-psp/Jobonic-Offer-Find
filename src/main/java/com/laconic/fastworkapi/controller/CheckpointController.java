package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.CheckResponseDTO;
import com.laconic.fastworkapi.dto.CheckpointDTO;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.ICheckpointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Tag(name = "checkpoint", description = "Checkpoint related APIs")
@RestController
@RequestMapping("/api/v1/checkpoint")
public class CheckpointController {
    private final ICheckpointService checkpointService;

    @Operation(summary = APIDocsHelper.CheckpointAPI.SAVE_CHECKPOINT)
    @PostMapping
    public CheckpointDTO create(@RequestBody CheckpointDTO checkpointDTO) throws IOException {
        return this.checkpointService.save(checkpointDTO);
    }

    @Operation(summary = APIDocsHelper.CheckpointAPI.UPDATE_CHECKPOINT)
    @PutMapping
    public CheckpointDTO update(@RequestParam UUID id, @RequestBody CheckpointDTO checkpointDTO) {
        return checkpointService.update(id, checkpointDTO);
    }

    @Operation(summary = APIDocsHelper.CheckpointAPI.DELETE_CHECKPOINT)
    @DeleteMapping
    public String delete(@RequestParam UUID id) {
        return this.checkpointService.delete(id);
    }

    @Operation(summary = APIDocsHelper.CheckpointAPI.GET_CHECKPOINT)
    @GetMapping()
    public CheckResponseDTO getById(@RequestParam UUID id) {
        return this.checkpointService.getById(id);
    }

    @Operation(summary = APIDocsHelper.CheckpointAPI.GET_CHECKPOINT_BY_SERVICE_ID)
    @GetMapping("/serviceId")
    public List<CheckResponseDTO> getByServiceId(@RequestParam UUID serviceId) {
        return checkpointService.getCheckPointByServiceId(serviceId);
    }

    @Operation(summary = APIDocsHelper.CheckpointAPI.GET_ALL_CHECKPOINT)
    @GetMapping("/all")
    public List<CheckResponseDTO> getAll() {
        return checkpointService.getAll();
    }
}