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
public class FreelancerReceiptDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -9025312274634384927L;
    private UUID id;
}
