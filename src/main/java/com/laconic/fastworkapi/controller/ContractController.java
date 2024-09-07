package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ContractDTO;
import com.laconic.fastworkapi.service.IContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contract")
@RequiredArgsConstructor
public class ContractController {

    private final IContractService contractService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ContractDTO contractDTO) {
        return ResponseEntity.ok(contractService.save(contractDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody ContractDTO contractDTO) {
        return ResponseEntity.ok(contractService.update(id, contractDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(contractService.getById(id));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(contractService.getAll());
    }

    @GetMapping("/get-by-match-id/{id}")
    public ResponseEntity<?> getContractByMatchId(@PathVariable UUID id) {
        return ResponseEntity.ok(contractService.getContractByMatchId(id));
    }

    @GetMapping("/get-all-contract/")
    public ResponseEntity<?> getContractByMatchData(@RequestParam UUID matchId) {
        return ResponseEntity.ok(contractService.listAll(matchId));
    }
}
