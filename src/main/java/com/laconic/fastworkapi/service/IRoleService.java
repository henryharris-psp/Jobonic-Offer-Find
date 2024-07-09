package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.UserRoleDTO;

import java.util.UUID;

public interface IRoleService {
    UserRoleDTO save(UserRoleDTO userRoleDTO);
    String disable(UUID id);
}
