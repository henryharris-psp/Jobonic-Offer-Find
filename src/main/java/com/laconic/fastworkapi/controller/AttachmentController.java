package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.AttachmentDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IAttachmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Tag(name = "attachment", description = "Attachment related APIs")
@RestController
@RequestMapping("/api/v1/attachment")
public class AttachmentController {

    private final IAttachmentService attachmentService;

    @Autowired
    public AttachmentController(IAttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.SAVE_ATTACHMENT)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AttachmentDTO save(@ModelAttribute AttachmentDTO attachmentDTO) throws Exception {
        return this.attachmentService.save(attachmentDTO);
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.GET_SERVICE_ATTACHMENTS)
    @GetMapping("/service")
    public List<AttachmentDTO> getServiceAttachments(@RequestParam UUID serviceId) {
        return this.attachmentService.getServiceAttachments(serviceId);
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.GET_USER_ATTACHMENTS)
    @GetMapping("/user")
    public List<AttachmentDTO> getUserAttachments(@RequestParam Long userId) {
        return this.attachmentService.getUserAttachments(userId);
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.GET_PROPOSAL_ATTACHMENTS)
    @GetMapping("/proposal")
    public List<AttachmentDTO> getProposalAttachments(@RequestParam UUID proposalId) {
        return this.attachmentService.getProposalAttachments(proposalId);
    }

    @GetMapping("/proposal")
    public List<AttachmentDTO> getCheckpointAttachments(@RequestParam UUID checkPointId) {
        return this.attachmentService.getCheckPointAttachments(checkPointId);
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.REMOVE_ATTACHMENT)
    @DeleteMapping
    public String remove(@RequestParam UUID id) throws Exception {
        return this.attachmentService.remove(id);
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.DOWNLOAD_ATTACHMENT)
    @GetMapping("/download")
    public ResponseEntity<Resource> download(@RequestParam UUID id) throws IOException {
        return this.attachmentService.download(id);
    }

    @Operation(summary = APIDocsHelper.AttachmentAPI.SHOW_ATTACHMENT)
    @GetMapping(value = "/show",produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<Resource> showFile(@RequestParam UUID id) throws IOException {
        return this.attachmentService.showFile(id);
    }

    @PostMapping("/check-point/status")
    public ResponseEntity<?> updateStatus(@RequestParam UUID checkPointId,@RequestParam Boolean status){
        return ResponseEntity.ok(attachmentService.updateStatus(checkPointId,status));
    }

}
