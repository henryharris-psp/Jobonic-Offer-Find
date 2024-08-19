package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ServiceFilterDTO {

    private double minPrice = 0.0;

    private double maxPrice = 0.0;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate submissionDeadline;
}
