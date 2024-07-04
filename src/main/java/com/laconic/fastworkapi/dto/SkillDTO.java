package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Skill;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SkillDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -3382216588787982320L;
    private UUID id;
    private String name;

    public SkillDTO(Skill skill) {
        this.id = skill.getId();
        this.name = skill.getName();
    }

    public Skill updateSkill(Skill skill) {
        skill.setName(this.getName());
        return skill;
    }
}
