package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.MatchesDTO;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.entity.Matches;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.repo.IMatchesRepo;
import com.laconic.fastworkapi.repo.IServiceRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.IMatchesService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MatchesService implements IMatchesService {
    private final IMatchesRepo matchesRepo;
    private final IUserRepo userRepo;
    private final IServiceRepo serviceRepo;
    private final ICheckpointRepo checkpointRepo;

    public MatchesService(IMatchesRepo matchesRepo, IUserRepo userRepo, IServiceRepo serviceRepo, ICheckpointRepo checkpointRepo) {
        this.matchesRepo = matchesRepo;
        this.userRepo = userRepo;
        this.serviceRepo = serviceRepo;
        this.checkpointRepo = checkpointRepo;
    }

    @Override
    public MatchesDTO save(MatchesDTO matchesDTO) {
        var user = this.userRepo.findById(matchesDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        matchesDTO.getProfileId().toString()));
        var service = this.serviceRepo.findById(matchesDTO.getServiceId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        matchesDTO.getServiceId().toString()));

        var match = EntityMapper.mapToEntity(matchesDTO, Matches.class);
        match.setProfile(user);
        match.setService(service);

        // Fetch Checkpoint entities from the repository
        List<Checkpoint> checkpoints = matchesDTO.getCheckPointList().stream()
                .map(checkpointId -> this.checkpointRepo.findById(checkpointId)
                        .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CHECKPOINT, "id", checkpointId.toString())))
                .collect(Collectors.toList());

        // Associate the checkpoints with the match
        match.setCheckpoints(checkpoints);

        var savedMatch = this.matchesRepo.save(match);
        return EntityMapper.mapToEntity(savedMatch, MatchesDTO.class);
    }

    @Override
    public MatchesDTO update(UUID id, MatchesDTO matchesDTO) {
        var existingMatch = this.matchesRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.MATCHES, "id", id.toString()));

        var user = this.userRepo.findById(matchesDTO.getProfileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                        matchesDTO.getProfileId().toString()));
        var service = this.serviceRepo.findById(matchesDTO.getServiceId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                        matchesDTO.getServiceId().toString()));

        existingMatch.setProfile(user);
        existingMatch.setService(service);
        existingMatch.setPaymentTotal(matchesDTO.getPaymentTotal());
//        existingMatch.setNumberOfCheckpoints(matchesDTO.getNumberOfCheckpoints());
//        existingMatch.setNumberOfCheckpointsLeft(matchesDTO.getNumberOfCheckpoints());
        existingMatch.setPaymentMode(matchesDTO.getPaymentMode());

        var updatedMatch = this.matchesRepo.save(existingMatch);
        return EntityMapper.mapToEntity(updatedMatch, MatchesDTO.class);
    }

    @Override
    public MatchesDTO getById(UUID id) {
        var existingMatch = getMatch(id);
        return new MatchesDTO(existingMatch);
    }

    @Override
    public List<MatchesDTO> getAll() {
        return this.matchesRepo.findAll().stream().map(MatchesDTO::new).toList();
    }

    @Override
    public String delete(UUID id) {
        var existingMatches = getMatch(id);
        existingMatches.setActive(false);
        this.matchesRepo.save(existingMatches);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.MATCHES);
    }

    private Matches getMatch(UUID id) {
        return this.matchesRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.MATCHES, "id",
                id.toString()));
    }
}