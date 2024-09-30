package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.AttachmentDTO;
import com.laconic.fastworkapi.entity.Attachment;
import com.laconic.fastworkapi.entity.Checkpoint;
import com.laconic.fastworkapi.exception.NotFoundException;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IAttachmentRepo;
import com.laconic.fastworkapi.repo.ICheckpointRepo;
import com.laconic.fastworkapi.service.IAttachmentService;
import com.laconic.fastworkapi.utils.DocumentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.util.List;
import java.util.UUID;

@Service
public class AttachmentService implements IAttachmentService {
    private final IAttachmentRepo attachmentRepo;
    private final ICheckpointRepo checkPointRepo;

    @Value("${server.file.basePath}")
    String filePath;
    DecimalFormat df = new DecimalFormat("#####################.##");

    @Autowired
    public AttachmentService(IAttachmentRepo attachmentRepo, ICheckpointRepo checkPointRepo) {
        this.attachmentRepo = attachmentRepo;
        this.checkPointRepo = checkPointRepo;
    }

    @Override
//    @Transactional
    public AttachmentDTO save(AttachmentDTO attachmentDTO) throws Exception {
        DocumentUtil.validateDocumentSize(attachmentDTO.getFile());
        var extension = DocumentUtil.getFileExtension(attachmentDTO.getFile());
        String size = df.format((double) attachmentDTO.getFile().getSize() / (1000f * 1000)) + " MB";
        var id = switch (attachmentDTO.getDocumentType()) {
            case SERVICE -> attachmentDTO.getServiceId();
            case PROPOSAL -> attachmentDTO.getProposalId();
            case RESUME -> attachmentDTO.getUserId();
            case CHECKPOINT -> attachmentDTO.getCheckPointId();
        };

        var location = DocumentUtil.getDocumentDestination(filePath, id.toString(),
                attachmentDTO.getDocumentType().name(), false);
        assert extension != null;

        Checkpoint checkpoint = this.checkPointRepo.findById(attachmentDTO.getCheckPointId())
                .orElseThrow(() -> new NotFoundException("Checkpoint not found"));

        var fileName = attachmentDTO.getFile().getName().concat(".").concat(extension);
        var attachment = Attachment.builder()
                .name(attachmentDTO.getFile().getName())
                .serviceId(attachmentDTO.getServiceId() != null ? attachmentDTO.getServiceId() : null)
                .userId(attachmentDTO.getUserId() != null ? attachmentDTO.getUserId() : null)
                .proposalId(attachmentDTO.getProposalId() != null ? attachmentDTO.getProposalId() : null)
                .checkPoint(checkpoint)
                .contentType(attachmentDTO.getFile().getContentType())
                .location(location)
                .extension(extension)
                .fileSize(size)
                .originalName(attachmentDTO.getFile().getOriginalFilename())
                .documentType(attachmentDTO.getDocumentType())
                .isActive(true)
                .status(false)
                .build();

        DocumentUtil.createFile(location, fileName, attachmentDTO.getFile());

        checkpoint.setStatus("submitted");

        this.checkPointRepo.save(checkpoint);

        return new AttachmentDTO(this.attachmentRepo.save(attachment));
    }

    @Override
    public List<AttachmentDTO> getServiceAttachments(UUID serviceId) {
        return this.attachmentRepo.findAllByServiceId(serviceId).stream().map(AttachmentDTO::new).toList();
    }

    @Override
    public List<AttachmentDTO> getUserAttachments(Long userId) {
        return this.attachmentRepo.findAllByUserId(userId).stream().map(AttachmentDTO::new).toList();
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

        var destination = DocumentUtil.getDocumentDestination(filePath, id.toString(),
                attachment.getDocumentType().name(), true);

        DocumentUtil.moveFile(source, destination);

        attachment.setActive(false);
        attachment.setLocation(destination);

        this.attachmentRepo.save(attachment);

        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.ATTACHMENT);
    }

    @Override
    public ResponseEntity<Resource> download(UUID id) throws IOException {
        var document = this.attachmentRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(AppMessage.DOCUMENT_NOT_FOUND));
        try {
            Path filePath = Paths.get(document.getLocation().concat("/").concat(document.getName()).concat(".").concat(document.getExtension()));
            if (Files.exists(filePath) && Files.isReadable(filePath)) {
                Resource resource = new FileSystemResource(filePath);

                if (resource.exists() || resource.isReadable()) {

                    return ResponseEntity.ok()
                            .contentType(MediaType.valueOf(MediaType.APPLICATION_OCTET_STREAM_VALUE))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + document.getOriginalName() + "\"")
                            .body(resource);
                } else {
                    throw new FileNotFoundException("Could not read file: " + filePath.toString());
                }
            } else {
                throw new FileNotFoundException("File does not exist or is not readable: " + filePath.toString());
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Resource> showFile(UUID id) throws IOException {
        var document = this.attachmentRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(AppMessage.DOCUMENT_NOT_FOUND));
        try {
            Path filePath = Paths.get(document.getLocation().concat("/").concat(document.getName()).concat(".").concat(document.getExtension()));
            if (Files.exists(filePath) && Files.isReadable(filePath)) {
                Resource resource = new FileSystemResource(filePath);

                if (resource.exists() || resource.isReadable()) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.valueOf(MediaType.APPLICATION_OCTET_STREAM_VALUE))
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + document.getName() + "\"")
                            .body(resource);
                } else {
                    throw new FileNotFoundException("Could not read file: " + filePath.toString());
                }
            } else {
                throw new FileNotFoundException("File does not exist or is not readable: " + filePath.toString());
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public List<AttachmentDTO> getCheckPointAttachments(UUID checkPointId) {
        return this.attachmentRepo.findAllByCheckPointId(checkPointId).stream().map(AttachmentDTO::new).toList();
    }

    @Override
    public Object updateStatus(UUID checkPointId, Boolean status) {
        List<Attachment> a = attachmentRepo.findAllByCheckPointId(checkPointId);
        a.forEach(b -> b.setStatus(status));
        attachmentRepo.saveAll(a);
        return "success";
    }
}
