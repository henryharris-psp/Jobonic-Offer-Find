package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.UserDTO;
import com.laconic.fastworkapi.dto.pagination.PageAndFilterDTO;
import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import com.laconic.fastworkapi.dto.pagination.SearchAndFilterDTO;
import com.laconic.fastworkapi.entity.User;
import com.laconic.fastworkapi.repo.IUserRepo;
import com.laconic.fastworkapi.repo.specification.UserSpecification;
import com.laconic.fastworkapi.service.IUserService;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.helper.PaginationHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService implements IUserService {
    public UserService(IUserRepo userRepo) {
        this.userRepo = userRepo;
    }

    private final IUserRepo userRepo;

    @Override
    public UserDTO save(UserDTO userDTO) {
        return new UserDTO(this.userRepo.save(userDTO.updateUser(new User())));
    }

    @Override
    public UserDTO update(UUID id, UserDTO userDTO) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                                              id.toString()));
        return new UserDTO(this.userRepo.save(userDTO.updateUser(existingUser)));
    }

    @Override
    public PaginationDTO<UserDTO> getAllUsers(PageAndFilterDTO<SearchAndFilterDTO> pageAndFilterDTO) {
        var specification = UserSpecification.hasKeyword(pageAndFilterDTO.getFilter().getSearchKeyword());
        var page = this.userRepo.findAll(specification, pageAndFilterDTO.getPageRequest());
        return PaginationHelper.getResponse(page,
                                            page.getContent().stream().map(UserDTO::new).toList());
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return this.userRepo.findAll().stream().map(UserDTO::new).toList();
    }

    @Override
    public String removeUser(UUID id) {
        var existingUser =
                this.userRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.USER, "id",
                                                                                              id.toString()));
        existingUser.setActive(false);
        this.userRepo.save(existingUser);
        return "User removed successfully";
    }
}
