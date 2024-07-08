package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.UserExperienceDTO;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.IUserExperienceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@Tag(name = "user-experience", description = "User Experience related APIs")
@RestController
@RequestMapping("/api/v1/user-experience")
public class UserExperienceController {
    private final IUserExperienceService userExperienceService;
    public UserExperienceController(IUserExperienceService userExperienceService) {
        this.userExperienceService = userExperienceService;
    }

    @Operation(summary = APIDocsHelper.UserExperienceAPI.UPDATE_USER_EXPERIENCE)
    @PutMapping
    public UserExperienceDTO update(@RequestParam UUID id, @RequestBody UserExperienceDTO userExperienceDTO) {
        return this.userExperienceService.update(id, userExperienceDTO);
    }

    @Operation(summary = APIDocsHelper.UserExperienceAPI.DELETE_USER_EXPERIENCE)
    @DeleteMapping
    public String delete(@RequestParam UUID id) {
        this.userExperienceService.delete(id);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.USER_EXPERIENCE);
    }

    @Operation(summary = APIDocsHelper.UserExperienceAPI.GET_ALL_USER_EXPERIENCE)
    @GetMapping("/all")
    public Collection<UserExperienceDTO> getAll(@RequestParam UUID userId) {
        return this.userExperienceService.getAll(userId);
    }
}
