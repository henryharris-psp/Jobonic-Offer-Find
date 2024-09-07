package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.CheckResponseDTO;
import com.laconic.fastworkapi.dto.ContractDTO;
import com.laconic.fastworkapi.dto.ContractResponseDTO;
import com.laconic.fastworkapi.dto.TaskDTO;
import com.laconic.fastworkapi.entity.Contract;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IContractRepo;
import com.laconic.fastworkapi.repo.TaskRepo;
import com.laconic.fastworkapi.service.*;
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
    private final TaskRepo taskRepo;
    private final ICheckpointService checkpointService;

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

    @Override
    public List<ContractResponseDTO> listAll(UUID matchId) {
        // Step 1: Fetch contracts by matchId and map them to DTO
        List<ContractResponseDTO> contractResponseDTOs = contractRepo.findByMatches_Id(matchId)
                .stream()
                .map(ContractResponseDTO::new)
                .toList();

        // Step 2: Fetch checkpoints by matchId and map them to DTO
        List<CheckResponseDTO> checkResponseDTOs = checkpointService.getCheckPointByServiceId(matchId)
                .stream()
                .map(CheckResponseDTO::new)
                .toList();

        // Step 3: Fetch tasks by checkpointIds (assuming getTaskByCheckPointId can accept a list of checkpoints)
        List<TaskDTO> taskDTOs = taskRepo.findByCheckpointIdIn(checkResponseDTOs.stream().map(CheckResponseDTO::getId).toList())
                .stream()
                .map(TaskDTO::new)
                .toList();

        // Step 4: Combine data - merge checkpoints and tasks into contractResponseDTOs
        for (ContractResponseDTO contractResponse : contractResponseDTOs) {
            // Add checkpoints to contract response
            contractResponse.setMilestones(checkResponseDTOs);

            // Add tasks to each checkpoint (you need logic to associate tasks with the correct checkpoint)
            for (CheckResponseDTO checkResponse : contractResponse.getMilestones()) {
                List<TaskDTO> relatedTasks = taskDTOs.stream()
                        .filter(task -> task.getCheckpointId().equals(checkResponse.getId()))
                        .toList();
                checkResponse.setTasks(relatedTasks);
            }
        }

        // Return the combined result
        return contractResponseDTOs;
    }

}
