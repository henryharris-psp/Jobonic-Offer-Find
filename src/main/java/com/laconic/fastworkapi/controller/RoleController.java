package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.UserRoleDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IRoleService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "role", description = "Role related APIs")
@RestController
@RequestMapping("/api/v1/role")
@Hidden
public class RoleController {

    private final IRoleService roleService;

    @Autowired
    public RoleController(IRoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    @Operation(summary = APIDocsHelper.RoleAPI.SAVE_ROLE)
    public UserRoleDTO save(@RequestBody UserRoleDTO userRoleDTO) {
        return this.roleService.save(userRoleDTO);
    }

    @DeleteMapping
    @Operation(summary = APIDocsHelper.RoleAPI.DELETE_SKILL)
    public String delete(@RequestParam UUID id) {
        return this.roleService.disable(id);
    }
}
