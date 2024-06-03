package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.UserDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    private final IUserService userService;

    @PostMapping
    @Operation(summary = APIDocsHelper.UserAPI.SAVE_USER)
    public UserDTO save(@RequestBody UserDTO userDTO) {
        return this.userService.save(userDTO);
    }

    @PutMapping
    @Operation(summary = APIDocsHelper.UserAPI.UPDATE_USER)
    public UserDTO update(@RequestParam UUID id, @RequestBody UserDTO userDTO) {
        return this.userService.update(id, userDTO);
    }

    @GetMapping("/all")
    @Operation(summary = APIDocsHelper.UserAPI.GET_ALL_USERS)
    public Collection<UserDTO> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @PostMapping("/all")
    @Operation(summary = APIDocsHelper.UserAPI.GET_USERS)
    public PaginationDTO<UserDTO> getUsers(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.userService.getAllUsers(pageAndFilterDTO);
    }

    @DeleteMapping
    @Operation(summary = APIDocsHelper.UserAPI.DELETE_USER)
    public String removeUser(@RequestParam UUID id) {
        return this.userService.removeUser(id);
    }

}
