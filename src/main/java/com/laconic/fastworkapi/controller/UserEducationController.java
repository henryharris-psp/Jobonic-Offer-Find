package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.UserEducationDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IUserEducationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@Tag(name = "user-education", description = "User Education related APIs")
@RestController
@RequestMapping("/api/v1/user-education")
public class UserEducationController {
    private final IUserEducationService userEducationService;

    public UserEducationController(IUserEducationService userEducationService) {
        this.userEducationService = userEducationService;
    }

    @Operation(summary = APIDocsHelper.UserEducationAPI.UPDATE_USER_EDUCATION)
    @PutMapping
    public UserEducationDTO update(@RequestParam UUID id, @RequestBody UserEducationDTO userEducationDTO) {
        return this.userEducationService.update(id, userEducationDTO);
    }

    @Operation(summary = APIDocsHelper.UserEducationAPI.DELETE_USER_EDUCATION)
    @DeleteMapping
    public String delete(@RequestParam UUID id) {
        this.userEducationService.delete(id);
        return "OK";
    }

    @Operation(summary = APIDocsHelper.UserEducationAPI.GET_ALL_USER_EDUCATION)
    @GetMapping("/all")
    public Collection<UserEducationDTO> getAll(@RequestParam UUID userId) {
        return this.userEducationService.getAll(userId);
    }
}
