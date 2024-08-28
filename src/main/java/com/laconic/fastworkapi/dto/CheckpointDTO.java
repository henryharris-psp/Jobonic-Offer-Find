package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Checkpoint;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CheckpointDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -8805087936102565403L;

    private UUID id;
    private UUID serviceId;
    private UUID matchId;
    private double price;
    private String title;
    private int numberOfHoursCompleted;
    @Column(columnDefinition = "CLOB")
    private String description;
    private String[] tasks; // Added to handle the tasks array

    /**
     * @param checkpoint the Checkpoint entity
     * @Author soe
     * @Note Constructs a CheckpointDTO from a Checkpoint entity.
     */
    public CheckpointDTO(Checkpoint checkpoint) {
        this.id = checkpoint.getId();
        this.serviceId = checkpoint.getService() != null ? checkpoint.getService().getId() : null;
        this.matchId = checkpoint.getMatches() != null ? checkpoint.getMatches().getId() : null;
        this.price = checkpoint.getPrice();
        this.title = checkpoint.getTitle();
        this.numberOfHoursCompleted = checkpoint.getNumberOfHoursCompleted();
        this.description = checkpoint.getDescription();
        try {
            this.tasks = checkpoint.getTasks();
        } catch (IOException e) {
            // Handle exception or provide default value
            this.tasks = new String[0]; // Default to empty array if conversion fails
        }
    }
}
