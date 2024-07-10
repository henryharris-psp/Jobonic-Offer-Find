package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceOfferDTO;

import java.util.UUID;

public interface IOfferService {
    ServiceOfferDTO update(UUID serviceOfferId, ServiceOfferDTO serviceOfferDTO);
    String remove(UUID serviceOfferId);
}
