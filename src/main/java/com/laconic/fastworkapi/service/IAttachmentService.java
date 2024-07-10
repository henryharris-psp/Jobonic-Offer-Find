package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.AttachmentDTO;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.UUID;

public interface IAttachmentService {
    AttachmentDTO save(AttachmentDTO attachmentDTO) throws Exception;
    List<AttachmentDTO> getServiceAttachments(UUID serviceId);
    List<AttachmentDTO> getUserAttachments(UUID userId);
    List<AttachmentDTO> getProposalAttachments(UUID proposalId);
    String remove(UUID id) throws Exception;
    ResponseEntity<Resource> download(UUID id) throws IOException;
    ResponseEntity<Resource> showFile(UUID id) throws IOException;
}
