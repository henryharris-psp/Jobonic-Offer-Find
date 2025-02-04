package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.PaymentOutDTO;
import com.laconic.fastworkapi.service.PaymentOutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payment-out")
@RequiredArgsConstructor
public class PaymentOutController {

    private final PaymentOutService agreementService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody PaymentOutDTO dto) {
        return ResponseEntity.ok(agreementService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody PaymentOutDTO dto) {
        return ResponseEntity.ok(agreementService.update(id, dto));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(agreementService.getAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(agreementService.getById(id));
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id) {
        return agreementService.delete(id);
    }
}
