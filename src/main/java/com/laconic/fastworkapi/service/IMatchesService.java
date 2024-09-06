package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.MatchesDTO;
import com.laconic.fastworkapi.entity.Matches;

import java.util.List;
import java.util.UUID;

public interface IMatchesService {
    MatchesDTO save(MatchesDTO matchesDTO);

    MatchesDTO update(UUID id, MatchesDTO matchesDTO);

    MatchesDTO getById(UUID id);

    List<MatchesDTO> getAll();

    String delete(UUID id);

    Matches getMatch(UUID id);
}