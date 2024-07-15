package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ProposalDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IProposalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "proposal", description = "Proposal related APIs")
@RestController
@RequestMapping("/api/v1/proposal")
public class ProposalController {
    private final IProposalService proposalService;

    @Autowired
    public ProposalController(IProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @Operation(summary = APIDocsHelper.ProposalAPI.SAVE_PROPOSAL)
    @PostMapping
    public ProposalDTO create(@RequestBody ProposalDTO.ProposalRequest proposalDTO) {
        return this.proposalService.save(proposalDTO);
    }

    @Operation(summary = APIDocsHelper.ProposalAPI.REMOVE_PROPOSAL)
    @DeleteMapping
    public String delete(@RequestParam UUID id) {
        return this.proposalService.remove(id);
    }

    @Operation(summary = APIDocsHelper.ProposalAPI.GET_SERVICE_PROPOSALS)
    @GetMapping("/service")
    public List<ProposalDTO> getServiceProposals(@RequestParam UUID serviceId) {
        return this.proposalService.getAllByServiceId(serviceId);
    }

    @Operation(summary = APIDocsHelper.ProposalAPI.GET_USER_PROPOSALS)
    @GetMapping("/user")
    public List<ProposalDTO> getUserProposals(@RequestParam Long userId) {
        return this.proposalService.getAllByUserId(userId);
    }
}
