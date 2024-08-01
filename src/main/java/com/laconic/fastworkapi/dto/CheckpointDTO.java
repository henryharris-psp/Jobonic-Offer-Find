package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Checkpoint;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private double price = 0;
    private int numberOfHoursCompleted;
    @Column(columnDefinition = "CLOB")
    private String description;

    public CheckpointDTO(Checkpoint checkpoint) {
        this.id = checkpoint.getId();
        this.serviceId = checkpoint.getService().getId();
        this.price = checkpoint.getPrice();
        this.numberOfHoursCompleted = checkpoint.getNumberOfHoursCompleted();
        this.description = checkpoint.getDescription();
    }
}