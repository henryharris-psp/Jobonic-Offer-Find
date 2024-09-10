package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Attachment;
import com.laconic.fastworkapi.enums.DocumentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AttachmentDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -5684968957512066889L;
    private UUID id;
    private UUID serviceId;
    private Long userId;
    private UUID proposalId;
    private String contentType;
    private String name;
    private String extension;
    private String fileSize;
    private DocumentType documentType;
    private MultipartFile file;
    private UUID checkPointId;
    private Boolean status;

    public AttachmentDTO(Attachment attachment) {
        this.id = attachment.getId();
        this.serviceId = attachment.getServiceId();
        this.userId = attachment.getUserId();
        this.proposalId = attachment.getProposalId();
        this.contentType = attachment.getContentType();
        this.name = attachment.getName();
        this.extension = attachment.getExtension();
        this.fileSize = attachment.getFileSize();
        this.documentType = attachment.getDocumentType();
        this.status=attachment.getStatus();
    }
}
