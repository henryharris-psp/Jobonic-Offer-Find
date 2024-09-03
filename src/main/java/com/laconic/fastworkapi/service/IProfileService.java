package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.UserProfileDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.List;

public interface IProfileService {
    ProfileDTO save(ProfileDTO profileDTO);

    ProfileDTO update(Long id, ProfileDTO profileDTO);

    ProfileDTO get(Long id);

    PaginationDTO<ProfileDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);

    List<ProfileDTO> getAllUsers();

    String removeUser(Long id);

    ProfileDTO getByUserId(Long userId);

    UserProfileDTO getUserProfileDto(Long id,String name);
}
