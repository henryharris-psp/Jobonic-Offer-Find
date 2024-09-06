package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.TaskDTO;
import com.laconic.fastworkapi.entity.Task;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.TaskRepo;
import com.laconic.fastworkapi.service.ICheckpointService;
import com.laconic.fastworkapi.service.ITaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService implements ITaskService {

    private final TaskRepo taskRepo;
    private final ICheckpointService checkpointService;


    private TaskDTO set(Task task, TaskDTO dto) {
        task.setCheckpoint(checkpointService.getCheckpoint(dto.getCheckpointId()));
        task.setName(dto.getName());
        task = taskRepo.save(task);
        return new TaskDTO(task);
    }

    @Override
    public TaskDTO save(TaskDTO taskDTO) {
        return set(new Task(), taskDTO);
    }

    @Override
    public TaskDTO update(UUID id, TaskDTO taskDTO) {
        Task task = getTaskByRepo(id);
        return set(task, taskDTO);
    }

    @Override
    public TaskDTO getById(UUID id) {
        return new TaskDTO(getTaskByRepo(id));
    }

    @Override
    public List<TaskDTO> getAll() {
        return taskRepo.findAll().stream().map(TaskDTO::new).toList();
    }

    @Override
    public Task getTaskByRepo(UUID uuid) {
        return taskRepo.findById(uuid).orElseThrow(ExceptionHelper.throwNotFoundException("Task", "id", uuid.toString()));
    }

    @Override
    public List<TaskDTO> getTaskByCheckPointId(UUID id) {
        return taskRepo.findAllByCheckpoint_Id(id).stream().map(TaskDTO::new).toList();
    }
}
