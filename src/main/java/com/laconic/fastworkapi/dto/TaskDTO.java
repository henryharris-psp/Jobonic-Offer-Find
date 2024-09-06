package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private UUID id;
    private UUID checkpointId;
    private String name;

    @JsonIgnore
    private Instant createDate;

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.checkpointId = task.getCheckpoint().getId();
        this.name = task.getName();
        this.createDate = task.getCreatedDate();
    }
}
