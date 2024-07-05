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
public class ProposalDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 4349758470812147428L;
    private UUID id;
}
