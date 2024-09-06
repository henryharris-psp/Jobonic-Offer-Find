package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ContractDTO;

import java.util.List;
import java.util.UUID;

public interface IContractService {
    ContractDTO save(ContractDTO contractDTO);

    ContractDTO update(UUID id, ContractDTO contractDTO);

    ContractDTO getById(UUID id);

    List<ContractDTO> getAll();

    List<ContractDTO> getContractByMatchId(UUID id);
}
