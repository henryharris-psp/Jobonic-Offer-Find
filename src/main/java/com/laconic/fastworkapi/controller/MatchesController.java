package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.MatchesDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IMatchesService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/matches")
public class MatchesController {
    private final IMatchesService matchesService;

    public MatchesController(IMatchesService matchesService) {
        this.matchesService = matchesService;
    }

    @Operation(summary = APIDocsHelper.MatchesAPI.GET_MATCHES)
    @GetMapping
    public MatchesDTO get(@RequestParam UUID id) {
        return this.matchesService.getById(id);
    }

    @Operation(summary = APIDocsHelper.MatchesAPI.SAVE_MATCHES)
    @PostMapping
    public MatchesDTO create(@RequestBody MatchesDTO matchesDTO) {
        return this.matchesService.save(matchesDTO);
    }

    @Operation(summary = APIDocsHelper.MatchesAPI.UPDATE_MATCHES)
    @PutMapping
    public MatchesDTO update(@RequestParam UUID id, @RequestBody MatchesDTO matchesDTO) {
        return this.matchesService.update(id, matchesDTO);
    }

    @Operation(summary = APIDocsHelper.MatchesAPI.GET_ALL_MATCHES)
    @GetMapping("/all")
    public Collection<MatchesDTO> getAll() {
        return this.matchesService.getAll();
    }

    @Operation(summary = APIDocsHelper.MatchesAPI.DELETE_MATCHES)
    @DeleteMapping
    public String delete(UUID id) {
        return this.matchesService.delete(id);
    }
}