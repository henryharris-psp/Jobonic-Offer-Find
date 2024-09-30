package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.entity.Attachment;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.entity.Task;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CheckpointDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -8805087936102565403L;

    @JsonIgnore
    private UUID id;
    private UUID serviceId;
    private UUID matchId;
    private UUID contractId;
    private double price;
    private String title;
    private int numberOfHoursCompleted;
    @Column(columnDefinition = "CLOB")
    private String description;
    private String status;

    @JsonIgnore
    private List<Task> tasks; // Added to handle the tasks array

    @JsonIgnore
    private List<Attachment> attachments; // Added to handle the attachments array

    public CheckpointDTO(Checkpoint checkpoint) {
        this.id = checkpoint.getId();
        this.serviceId = checkpoint.getService() != null ? checkpoint.getService().getId() : null;
        this.matchId = checkpoint.getMatches() != null ? checkpoint.getMatches().getId() : null;
        this.price = checkpoint.getPrice();
        this.title = checkpoint.getTitle();
        this.numberOfHoursCompleted = checkpoint.getNumberOfHoursCompleted();
        this.description = checkpoint.getDescription();
        this.contractId=checkpoint.getContract().getId();
        this.attachments = checkpoint.getAttachments();
        this.tasks = checkpoint.getTasks();
        this.status = checkpoint.getStatus();
    }
}
