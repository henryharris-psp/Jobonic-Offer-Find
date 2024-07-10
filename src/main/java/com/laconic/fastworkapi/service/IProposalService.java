package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ProposalDTO;

import java.util.List;
import java.util.UUID;

public interface IProposalService {
    ProposalDTO save(ProposalDTO.ProposalRequest proposalDTO);
    String remove(UUID id);
    List<ProposalDTO> getAllByServiceId(UUID serviceId);
    List<ProposalDTO> getAllByUserId(UUID userId);
}
