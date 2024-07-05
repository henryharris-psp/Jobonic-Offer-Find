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
public class EmployerPaymentDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -5595001474187733297L;
    private UUID id;
}
