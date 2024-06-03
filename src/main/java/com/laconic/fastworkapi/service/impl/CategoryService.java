package com.laconic.fastworkapi.service.impl;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.dto.CategoryDTO;
import com.laconic.fastworkapi.entity.Category;
import com.laconic.fastworkapi.helper.ExceptionHelper;
import com.laconic.fastworkapi.repo.ICategoryRepo;
import com.laconic.fastworkapi.service.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryService implements ICategoryService {
    private final ICategoryRepo categoryRepo;

    public CategoryService(ICategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        return new CategoryDTO(this.categoryRepo.save(categoryDTO.updateCategory(new Category())));
    }

    @Override
    public CategoryDTO update(UUID id, CategoryDTO categoryDTO) {
        var existingCategory = getCategory(id);
        return new CategoryDTO(this.categoryRepo.save(categoryDTO.updateCategory(existingCategory)));
    }

    @Override
    public CategoryDTO getById(UUID id) {
        var existingCategory = getCategory(id);
        return new CategoryDTO(existingCategory);
    }

    @Override
    public List<CategoryDTO> getAll() {
        return this.categoryRepo.findAll().stream().map(CategoryDTO::new).toList();
    }

    @Override
    public String delete(UUID id) {
        var existingCategory = getCategory(id);
        existingCategory.setActive(false);
        this.categoryRepo.save(existingCategory);
        return String.format(AppMessage.DELETE_MESSAGE, AppMessage.CATEGORY);
    }

    private Category getCategory(UUID id) {
        return this.categoryRepo.findById(id).orElseThrow(ExceptionHelper.throwNotFoundException(AppMessage.CATEGORY, "id",
                                                                                                  id.toString()));
    }
}
