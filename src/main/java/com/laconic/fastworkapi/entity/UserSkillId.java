package com.laconic.fastworkapi.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@EqualsAndHashCode
@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSkillId implements Serializable {
    @Serial
    private static final long serialVersionUID = -3053766200048697525L;
    private UUID userId;
    private UUID skillId;
}
