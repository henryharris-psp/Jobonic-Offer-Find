package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.List;
import java.util.UUID;

public interface IProfileService {
    ProfileDTO save(ProfileDTO profileDTO);
    ProfileDTO update(UUID id, ProfileDTO profileDTO);
    PaginationDTO<ProfileDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
    List<ProfileDTO> getAllUsers();
    String removeUser(UUID id);
}
