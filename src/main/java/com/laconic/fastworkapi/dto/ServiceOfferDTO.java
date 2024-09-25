package com.laconic.fastworkapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.entity.ServiceOffer;
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
public class ServiceOfferDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -3853581697205725074L;

    @JsonIgnore
    private UUID id;

    public ServiceOfferDTO(ServiceOffer serviceOffer) {
        this.id = serviceOffer.getId();
    }
}
