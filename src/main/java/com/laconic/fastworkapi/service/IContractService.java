package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ContractDTO;
import com.laconic.fastworkapi.dto.ContractResponseDTO;

import java.util.List;
import java.util.UUID;

public interface IContractService {
    ContractDTO save(ContractDTO contractDTO);

    ContractDTO update(UUID id, ContractDTO contractDTO);

    ContractResponseDTO getById(UUID id);

    List<ContractDTO> getAll();

    List<ContractDTO> getContractByMatchId(UUID id);

    List<ContractResponseDTO> listAll(UUID matchId);

    List<ContractResponseDTO>  getByProfile(Long profileId);
}
