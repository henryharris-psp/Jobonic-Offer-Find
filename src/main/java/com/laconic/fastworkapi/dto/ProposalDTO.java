package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.Proposal;
import com.laconic.fastworkapi.service.impl.ManagementService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.security.Provider;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProposalDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 4349758470812147428L;
    private UUID id;
    private String note;
    private ServiceDTO serviceDTO;
    private ProfileDTO profileDTO;

    public ProposalDTO(Proposal proposal, ProfileDTO profileDTO, ServiceDTO serviceDTO) {
        this.id = proposal.getId();
        this.note = proposal.getNote();
        this.serviceDTO = serviceDTO;
        this.profileDTO = profileDTO;
    }

    public record ProposalRequest(String note, UUID serviceId, UUID profileId) {}
}
