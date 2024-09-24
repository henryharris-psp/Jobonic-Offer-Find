package com.laconic.fastworkapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.laconic.fastworkapi.entity.audit.Auditable;
import com.laconic.fastworkapi.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.util.UUID;

@Entity
@Table(name = "attachments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SQLRestriction("is_active = true")
public class Attachment  extends Auditable<UUID>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private UUID serviceId;
    private Long userId;
    private UUID proposalId;
    private String contentType;
    private String name;
    private String location;
    private String extension;
    private String fileSize;
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;
    private boolean isActive = true;
//    private UUID checkPointId;

    @ManyToOne
    @JoinColumn(name = "check_point_id", referencedColumnName = "id")
    @JsonIgnore
    private Checkpoint checkPoint;

    private Boolean status;
    private String originalName;
}
