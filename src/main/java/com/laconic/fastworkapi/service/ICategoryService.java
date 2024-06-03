package com.laconic.fastworkapi.service;

import com.laconic.fastworkapi.dto.CategoryDTO;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    CategoryDTO save(CategoryDTO categoryDTO);
    CategoryDTO update(UUID id, CategoryDTO categoryDTO);
    CategoryDTO getById(UUID id);
    List<CategoryDTO> getAll();
    String delete(UUID id);
}
