package com.laconic.fastworkapi.repo;

import com.laconic.fastworkapi.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IAttachmentRepo extends JpaRepository<Attachment, UUID> {
    List<Attachment> findAllByServiceId(UUID serviceId);
    List<Attachment> findAllByUserId(UUID userId);
    List<Attachment> findAllByProposalId(UUID proposalId);
}
