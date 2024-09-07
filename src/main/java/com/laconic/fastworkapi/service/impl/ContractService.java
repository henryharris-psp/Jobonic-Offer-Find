package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.ContractDTO;
import com.laconic.fastworkapi.entity.Contract;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IContractRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.IContractService;
import com.laconic.fastworkapi.service.IMatchesService;
import com.laconic.fastworkapi.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ContractService implements IContractService {

    private final IContractRepo contractRepo;
    private final IMatchesService matchesService;
    private final IProfileService profileService;
    private ContractDTO set(Contract contract, ContractDTO dto) {
        dto.getAcceptBy().forEach(profileService::get);
        contract.setDeliverable(dto.getDeliverable());
        contract.setPrice(dto.getPrice());
        contract.setMatches(matchesService.getMatch(dto.getMatchesId()));
        contract.setAcceptBy(dto.getAcceptBy());
//        contract.setIsFreelancerConfirmed(dto.getIsFreelancerConfirmed());
//        contract.setIsEmployerConfirmed(dto.getIsEmployerConfirmed());
        contract = contractRepo.save(contract);
        return new ContractDTO(contract);
    }

    @Override
    public ContractDTO save(ContractDTO contractDTO) {
        return set(new Contract(), contractDTO);
    }

    @Override
    public ContractDTO update(UUID id, ContractDTO contractDTO) {
        Contract contract = getContract(id);
        return set(contract, contractDTO);
    }

    @Override
    public ContractDTO getById(UUID id) {
        return new ContractDTO(getContract(id));
    }

    @Override
    public List<ContractDTO> getAll() {
        return contractRepo.findAll().stream().map(ContractDTO::new).toList();
    }

    @Override
    public List<ContractDTO> getContractByMatchId(UUID id) {
        return contractRepo.findByMatches_Id(id).stream().map(ContractDTO::new).toList();
    }

    public Contract getContract(UUID uuid) {
        return contractRepo.findById(uuid).orElseThrow(ExceptionHelper.throwNotFoundException("Contract", "id", uuid.toString()));
    }
}
