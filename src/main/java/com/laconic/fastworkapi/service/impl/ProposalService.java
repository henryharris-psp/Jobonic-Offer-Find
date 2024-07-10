package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.ProposalDTO;
import com.laconic.fastworkapi.dto.ServiceDTO;
import com.laconic.fastworkapi.entity.Profile;
import com.laconic.fastworkapi.entity.Proposal;
import com.laconic.fastworkapi.entity.ServiceManagement;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IProposalRepo;
import com.laconic.fastworkapi.repo.IServiceRepo;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.service.IProposalService;
import com.laconic.fastworkapi.utils.EntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProposalService implements IProposalService {
    private final IProposalRepo proposalRepo;
    private final IUserRepo userRepo;
    private final IServiceRepo serviceRepo;

    @Autowired
    public ProposalService(IProposalRepo proposalRepo, IUserRepo userRepo, IServiceRepo serviceRepo) {
        this.proposalRepo = proposalRepo;
        this.userRepo = userRepo;
        this.serviceRepo = serviceRepo;
    }

    @Override
    public ProposalDTO save(ProposalDTO.ProposalRequest proposalDTO) {
        var user = this.userRepo.findById(proposalDTO.profileId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id", proposalDTO.profileId().toString()));
        var service = this.serviceRepo.findById(proposalDTO.serviceId())
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.SERVICE, "id",
                                                                    proposalDTO.profileId().toString()));
        var proposal = this.proposalRepo.save(Proposal.builder()
                                                      .note(proposalDTO.note())
                                                      .service(service)
                                                      .profile(user)
                                                      .build());
        return getProposalDTO(proposal, user, service);
    }

    @Override
    public String remove(UUID id) {
        var proposal = this.proposalRepo.findById(id)
                .orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.PROPOSAL, "id",
                                                                    id.toString()));
        proposal.setActive(false);
        this.proposalRepo.save(proposal);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.PROPOSAL);
    }

    @Override
    public List<ProposalDTO> getAllByServiceId(UUID serviceId) {
        return this.proposalRepo.findAllByServiceId(serviceId).stream()
                .map(p -> getProposalDTO(p, p.getProfile(), p.getService())).toList();
    }

    @Override
    public List<ProposalDTO> getAllByUserId(UUID userId) {
        return this.proposalRepo.findAllByProfileId(userId).stream()
                .map(p -> getProposalDTO(p, p.getProfile(), p.getService())).toList();
    }

    private static ProposalDTO getProposalDTO(Proposal proposal, Profile user, ServiceManagement service) {
        return new ProposalDTO(proposal,
                               EntityMapper.mapToResponse(user, ProfileDTO.class),
                               EntityMapper.mapToResponse(service, ServiceDTO.class));
    }
}
