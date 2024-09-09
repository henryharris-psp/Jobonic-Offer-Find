package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Checkpoint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckResponseDTO {

    private UUID id;
    private UUID serviceId;
    private String title;
    private UUID contractId;
    private Double price;
    private String description;
    private List<TaskDTO> tasks;

    public CheckResponseDTO(Checkpoint checkpoint) {
        this.serviceId=checkpoint.getService().getId();
        this.contractId=checkpoint.getContract().getId();
        this.id = checkpoint.getId();
        this.title = checkpoint.getTitle();
        this.price = checkpoint.getPrice();
        this.description = checkpoint.getDescription();

    }
}
