package com.laconic.fastworkapi.dto;

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
    private String contentType;
    private String name;
    private MultipartFile file;
}
