package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.FreelancerReceiptDTO;
import com.laconic.fastworkapi.service.IFreelancerReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/freelancer/receipt")
@RequiredArgsConstructor
public class FreelancerReceiptController {

    private final IFreelancerReceiptService freelancerReceiptService;

    @PostMapping
    public ResponseEntity<?> getFreelancerPayment(@RequestBody FreelancerReceiptDTO receiptDTO) {
        return ResponseEntity.ok(freelancerReceiptService.saveFreelancerReceiptPayment(receiptDTO));
    }

    @GetMapping("/get-by-check-point")
    public ResponseEntity<?> getFreelancerFromCheckPoint(@RequestParam UUID checkPointId){
        return ResponseEntity.ok(freelancerReceiptService.getFreelancerReceiptFromCheckPoint(checkPointId));
    }

}
