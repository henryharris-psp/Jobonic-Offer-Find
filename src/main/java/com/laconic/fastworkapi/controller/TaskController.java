package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.TaskDTO;
import com.laconic.fastworkapi.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
public class TaskController {

    private final ITaskService taskService;

    @PostMapping
    public ResponseEntity<?> saveTask(@RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.save(taskDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.update(id, taskDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(taskService.getById(id));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(taskService.getAll());
    }

    @GetMapping("/get-by-check-point-id/{id}")
    public ResponseEntity<?> getTaskByCheckPointId(@PathVariable UUID id) {
        return ResponseEntity.ok(taskService.getTaskByCheckPointId(id));
    }

}
