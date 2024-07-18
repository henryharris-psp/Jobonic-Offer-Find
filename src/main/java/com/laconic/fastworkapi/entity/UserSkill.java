package com.laconic.fastworkapi.entity;

import com.laconic.fastworkapi.entity.audit.Auditable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@IdClass(UserSkillId.class)
public class UserSkill extends Auditable<UUID> {
    @Id
    private Long userId;

    @Id
    private UUID skillId;
    private boolean isActive = true;
}
