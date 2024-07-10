package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.dto.ServiceOfferDTO;
import com.laconic.fastworkapi.entity.ServiceOffer;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IServiceOfferRepo;
import com.laconic.fastworkapi.service.IOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OfferService implements IOfferService {
    private final IServiceOfferRepo serviceOfferRepo;

    @Autowired
    public OfferService(IServiceOfferRepo serviceOfferRepo) {
        this.serviceOfferRepo = serviceOfferRepo;
    }

    @Override
    public ServiceOfferDTO update(UUID serviceOfferId, ServiceOfferDTO serviceOfferDTO) {
        var offer = this.getServiceOffer(serviceOfferId);
        return new ServiceOfferDTO(this.serviceOfferRepo.save(serviceOfferDTO.updateServiceOffer(offer)));
    }

    @Override
    public String remove(UUID serviceOfferId) {
        var offer = this.getServiceOffer(serviceOfferId);
        offer.setActive(false);
        this.serviceOfferRepo.save(offer);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.SERVICE_OFFER);
    }

    private ServiceOffer getServiceOffer(UUID serviceOfferId) {
        return this.serviceOfferRepo.findById(serviceOfferId).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE_OFFER, "id",
                                                                                                                 serviceOfferId.toString()));
    }
}
