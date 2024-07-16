package com.laconic.fastworkapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSkillDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 6250136298327941056L;
    private Long userId;
    private Set<SkillDTO> skillList;
}