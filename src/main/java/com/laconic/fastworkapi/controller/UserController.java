package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.ProfileDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IProfileService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    public UserController(IProfileService userService) {
        this.userService = userService;
    }

    private final IProfileService userService;

    @PostMapping
    @Operation(summary = APIDocsHelper.UserAPI.SAVE_USER)
    public ProfileDTO save(@RequestBody ProfileDTO profileDTO) {
        return this.userService.save(profileDTO);
    }

    @PutMapping
    @Operation(summary = APIDocsHelper.UserAPI.UPDATE_USER)
    public ProfileDTO update(@RequestParam UUID id, @RequestBody ProfileDTO profileDTO) {
        return this.userService.update(id, profileDTO);
    }

    @GetMapping("/{id}")
    @Operation(summary = APIDocsHelper.UserAPI.GET_USER)
    public ProfileDTO getUser(@RequestParam UUID id) {
        return this.userService.get(id);
    }

    @GetMapping("/all")
    @Operation(summary = APIDocsHelper.UserAPI.GET_ALL_USERS)
    public Collection<ProfileDTO> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @PostMapping("/all")
    @Operation(summary = APIDocsHelper.UserAPI.GET_USERS)
    public PaginationDTO<ProfileDTO> getUsers(@RequestBody PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        return this.userService.getAllUsers(pageAndFilterDTO);
    }

    @DeleteMapping
    @Operation(summary = APIDocsHelper.UserAPI.DELETE_USER)
    public String removeUser(@RequestParam UUID id) {
        return this.userService.removeUser(id);
    }

}
