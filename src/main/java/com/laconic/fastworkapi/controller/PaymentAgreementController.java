package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.PaymentAgreementDTO;
import com.laconic.fastworkapi.service.PaymentAgreementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentAgreementController {

    private final PaymentAgreementService agreementService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody PaymentAgreementDTO dto) {
        return ResponseEntity.ok(agreementService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody PaymentAgreementDTO dto) {
        return ResponseEntity.ok(agreementService.update(id, dto));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(agreementService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(agreementService.getById(id));
    }

}
