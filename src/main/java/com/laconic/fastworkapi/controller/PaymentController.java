package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.PaymentDTO;
import com.laconic.fastworkapi.dto.PaymentResponseDTO;
import com.laconic.fastworkapi.dto.PayniResponseDTO;
import com.laconic.fastworkapi.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody PaymentDTO paymentDTO) {
        return paymentService.save(paymentDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(paymentService.getById(id));
    }

    @PostMapping("/get-by-page")
    public ResponseEntity<?> getByPage(@RequestBody PaymentDTO.PaymentSearchDTO filterDTO) {
        return ResponseEntity.ok(paymentService.filter(filterDTO));
    }
}
