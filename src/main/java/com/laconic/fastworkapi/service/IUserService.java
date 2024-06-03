package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.UserDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    UserDTO save(UserDTO userDTO);
    UserDTO update(UUID id, UserDTO userDTO);
    PaginationDTO<UserDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO);
    List<UserDTO> getAllUsers();
    String removeUser(UUID id);
}
