package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.dto.CheckResponseDTO;
import com.laconic.fastworkapi.dto.ContractDTO;
import com.laconic.fastworkapi.dto.ContractResponseDTO;
import com.laconic.fastworkapi.dto.TaskDTO;
import com.laconic.fastworkapi.entity.Contract;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IContractRepo;
import com.laconic.fastworkapi.repo.TaskRepo;
import com.laconic.fastworkapi.service.ICheckpointService;
import com.laconic.fastworkapi.service.IContractService;
import com.laconic.fastworkapi.service.IMatchesService;
import com.laconic.fastworkapi.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
        contract.setProfile(profileService.getByRepo(dto.getProfileId()));
        contract.setDeliverable(dto.getDeliverable());
        contract.setPrice(dto.getPrice());
        contract.setMatches(matchesService.getMatch(dto.getMatchesId()));
        contract.setAcceptBy(dto.getAcceptBy());
        contract.setActive(true);
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
    public ContractResponseDTO getById(UUID id) {
        ContractResponseDTO contractResponseDTO = new ContractResponseDTO(getContract(id));

        List<CheckResponseDTO> checkResponseDTOs = checkpointService.getCheckPointByContractIdIn(Collections.singletonList(contractResponseDTO.getId()))
                .stream()
                .map(CheckResponseDTO::new)
                .toList();

        List<UUID> checkpointIds = checkResponseDTOs.stream()
                .map(CheckResponseDTO::getId)
                .toList();

        List<TaskDTO> taskDTOs = taskRepo.findByCheckpointIdIn(checkpointIds)
                .stream()
                .map(TaskDTO::new)
                .toList();

        Map<UUID, List<TaskDTO>> tasksGroupedByCheckpoint = taskDTOs.stream()
                .collect(Collectors.groupingBy(TaskDTO::getCheckpointId));

        for (CheckResponseDTO checkResponseDTO : checkResponseDTOs) {
            List<TaskDTO> relatedTasks = tasksGroupedByCheckpoint.getOrDefault(checkResponseDTO.getId(), new ArrayList<>());
            checkResponseDTO.setTasks(relatedTasks);
        }

        contractResponseDTO.setMilestones(checkResponseDTOs);

        return contractResponseDTO;
    }


    @Override
    public List<ContractResponseDTO> getAll() {
        return contractRepo.findAll().stream().map(ContractResponseDTO::new).toList();
    }

    @Override
    public List<ContractResponseDTO> getContractByMatchId(UUID id) {
        return contractRepo.findByMatches_Id(id).stream().map(ContractResponseDTO::new).toList();
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
        return getContractDto(contractResponseDTOs);


    }

    public List<ContractResponseDTO> getContractDto(List<ContractResponseDTO> contractResponseDTOs) {
        // Step 2: Fetch checkpoints by contract IDs and map them to DTOs
        List<UUID> contractIds = contractResponseDTOs.stream()
                .map(ContractResponseDTO::getId)
                .toList();

        List<CheckResponseDTO> checkResponseDTOs = checkpointService.getCheckPointByContractIdIn(contractIds)
                .stream()
                .map(CheckResponseDTO::new)
                .toList();

        // Step 3: Fetch tasks by checkpoint IDs and map them to DTOs
        List<UUID> checkpointIds = checkResponseDTOs.stream()
                .map(CheckResponseDTO::getId)
                .toList();

        List<TaskDTO> taskDTOs = taskRepo.findByCheckpointIdIn(checkpointIds)
                .stream()
                .map(TaskDTO::new)
                .toList();

        Map<UUID, List<TaskDTO>> tasksGroupedByCheckpoint = taskDTOs.stream()
                .collect(Collectors.groupingBy(TaskDTO::getCheckpointId));

        // Add checkpoints and tasks to the respective contracts
        for (ContractResponseDTO contractResponse : contractResponseDTOs) {
            // Get the checkpoints for this contract
            List<CheckResponseDTO> relatedCheckpoints = checkResponseDTOs.stream()
                    .filter(check -> check.getContractId().equals(contractResponse.getId()))
                    .toList();

            // Add tasks to each checkpoint
            for (CheckResponseDTO checkResponse : relatedCheckpoints) {
                List<TaskDTO> relatedTasks = tasksGroupedByCheckpoint.getOrDefault(checkResponse.getId(), new ArrayList<>());
                checkResponse.setTasks(relatedTasks);
            }

            // Set the milestones (checkpoints) for the contract
            contractResponse.setMilestones(relatedCheckpoints);
        }

        // Return the combined result
        return contractResponseDTOs;
    }

    @Override
    public List<ContractResponseDTO> getByProfile(Long profileId) {
        List<ContractResponseDTO> contractResponseDTOs = contractRepo.findByProfile_Id(profileId)
                .stream()
                .map(ContractResponseDTO::new)
                .toList();
        return getContractDto(contractResponseDTOs);
    }

    @Override
    public Object deleteById(UUID id) {
        var contract = getContract(id);
        contract.setActive(false);
        contractRepo.save(contract);
        return "success";
    }
}
