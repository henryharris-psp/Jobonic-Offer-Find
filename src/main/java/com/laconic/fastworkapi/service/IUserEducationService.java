package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.UserEducationDTO;

import java.util.List;
import java.util.UUID;

public interface IUserEducationService {

    UserEducationDTO update(UUID id, UserEducationDTO userEducationDTO);

    void delete(UUID id);

    List<UserEducationDTO> getAll(Long profileId);
}
