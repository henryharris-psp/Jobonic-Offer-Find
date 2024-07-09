package com.laconic.fastworkapi.dto;

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
public class ServiceRequestDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -1614326500232746332L;
    private UUID id;
}
