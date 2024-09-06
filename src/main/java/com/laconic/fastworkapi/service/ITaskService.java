package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.TaskDTO;
import com.laconic.fastworkapi.entity.Task;

import java.util.List;
import java.util.UUID;

public interface ITaskService {

    TaskDTO save(TaskDTO taskDTO);

    TaskDTO update(UUID id, TaskDTO taskDTO);

    TaskDTO getById(UUID id);

    List<TaskDTO> getAll();

    Task getTaskByRepo(UUID uuid);

    List<TaskDTO> getTaskByCheckPointId(UUID id);
}
