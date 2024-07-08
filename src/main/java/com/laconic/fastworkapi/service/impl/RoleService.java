package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.UserRoleDTO;
import com.laconic.fastworkapi.entity.Role;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.IRoleRepo;
import com.laconic.fastworkapi.service.IRoleService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RoleService implements IRoleService {
    private final IRoleRepo roleRepo;

    public RoleService(IRoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public UserRoleDTO save(UserRoleDTO userRoleDTO) {
        return new UserRoleDTO(this.roleRepo.save(userRoleDTO.updateRole(new Role())));
    }

    @Override
    public String disable(UUID id) {
        var role = this.roleRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.ROLE,
                                                                                                 "id", id.toString()));
        role.setActive(false);
        this.roleRepo.save(role);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.ROLE);
    }
}
