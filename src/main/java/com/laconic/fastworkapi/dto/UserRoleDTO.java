package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Role;
import com.laconic.fastworkapi.enums.RoleType;
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

public class UserRoleDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 6250136298327941056L;
    private UUID id;
    private RoleType roleType;

    public UserRoleDTO(Role role) {
        this.id = role.getId();
        this.roleType = role.getRoleType();
    }

    public Role updateRole(Role role) {
        role.setRoleType(this.getRoleType());
        return role;
    }
}
