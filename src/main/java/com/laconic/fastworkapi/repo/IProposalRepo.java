package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IProposalRepo extends JpaRepository<Proposal, UUID> {
    List<Proposal> findAllByServiceId(UUID serviceId);
    List<Proposal> findAllByProfileId(UUID profileId);
}
