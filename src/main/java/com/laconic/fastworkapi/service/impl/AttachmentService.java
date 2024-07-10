package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.AttachmentDTO;
import com.laconic.fastworkapi.entity.Attachment;
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IAttachmentRepo;
import com.laconic.fastworkapi.service.IAttachmentService;
import com.laconic.fastworkapi.utils.DocumentUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.util.List;
import java.util.UUID;

@Service
public class AttachmentService implements IAttachmentService {
    @Value("${server.file.basePath}")
    String filePath;
    private final IAttachmentRepo attachmentRepo;
    DecimalFormat df = new DecimalFormat("#####################.##");

    public AttachmentService(IAttachmentRepo attachmentRepo) {
        this.attachmentRepo = attachmentRepo;
    }

    @Override
    @Transactional
    public AttachmentDTO save(AttachmentDTO attachmentDTO) throws Exception {
        DocumentUtil.validateDocumentSize(attachmentDTO.getFile());
        var extension = DocumentUtil.getFileExtension(attachmentDTO.getFile());
        String size = df.format((double) attachmentDTO.getFile().getSize() / (1000f * 1000)) + " MB";
        var id = switch(attachmentDTO.getDocumentType()) {
            case SERVICE -> attachmentDTO.getServiceId();
            case PROPOSAL -> attachmentDTO.getProposalId();
            case RESUME -> attachmentDTO.getUserId();
        };
        var location = DocumentUtil.getDocumentDestination(filePath, id,
                                                           attachmentDTO.getDocumentType().name(), false);
        var fileName = attachmentDTO.getFile().getName();
        var attachment = Attachment.builder()
                .name(attachmentDTO.getFile().getName())
                .serviceId(attachmentDTO.getServiceId() != null ? attachmentDTO.getServiceId() : null)
                .userId(attachmentDTO.getUserId() != null ? attachmentDTO.getUserId() : null)
                .proposalId(attachmentDTO.getProposalId() != null ? attachmentDTO.getProposalId() : null)
                .contentType(attachmentDTO.getFile().getContentType())
                .location(location)
                .extension(extension)
                .fileSize(size)
                .documentType(attachmentDTO.getDocumentType())
                .build();
        DocumentUtil.createFile(location, fileName, attachmentDTO.getFile());
        return new AttachmentDTO(this.attachmentRepo.save(attachment));
    }

    @Override
    public List<AttachmentDTO> getServiceAttachments(UUID serviceId) {
        return this.attachmentRepo.findAllByServiceId(serviceId).stream().map(AttachmentDTO::new).toList();
    }

    @Override
    public List<AttachmentDTO> getUserAttachments(UUID userId) {
        return  this.attachmentRepo.findAllByUserId(userId).stream().map(AttachmentDTO::new).toList();
    }

    @Override
    public List<AttachmentDTO> getProposalAttachments(UUID proposalId) {
        return this.attachmentRepo.findAllByProposalId(proposalId).stream().map(AttachmentDTO::new).toList();
    }

    @Override
    public String remove(UUID id) throws Exception {
        var attachment =
                this.attachmentRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.ATTACHMENT, "id",
                                                                                                              id.toString()));
        var source = attachment.getLocation();
        var destination = DocumentUtil.getDocumentDestination(filePath, id,
                                                         attachment.getDocumentType().name(), false);
        DocumentUtil.moveFile(source, destination);
        attachment.setActive(false);
        attachment.setLocation(destination);
        this.attachmentRepo.save(attachment);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.ATTACHMENT);
    }

    @Override
    public ResponseEntity<Resource> download(UUID id) throws IOException {
        var document =
                this.attachmentRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.ATTACHMENT, "id",
                                                                                                    id.toString()));
            Path file = Paths.get(document.getLocation());
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                var mediaType = MediaType.parseMediaType(Files.probeContentType(file));
                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new NotFoundException(AppMessage.DOCUMENT_NOT_FOUND);
            }
    }

    @Override
    public ResponseEntity<Resource> showFile(UUID id) throws IOException {
        var document =
                this.attachmentRepo.findById(id).orElseThrow(() -> new NotFoundException(AppMessage.DOCUMENT_NOT_FOUND));
        Path path = Paths.get(document.getLocation());
        Resource resource = new InputStreamResource(Files.newInputStream(path));
        MediaType mediaType = MediaType.parseMediaType(Files.probeContentType(path));
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
