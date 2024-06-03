package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.dto.CategoryDTO;
import com.laconic.fastworkapi.entity.Category;
import com.laconic.fastworkapi.helper.APIDocsHelper;
import com.laconic.fastworkapi.service.ICategoryService;
import com.laconic.fastworkapi.service.impl.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = APIDocsHelper.CategoryAPI.GET_CATEGORY)
    @GetMapping
    public CategoryDTO getCategory(@RequestParam UUID id) {
        return this.categoryService.getById(id);
    }

    @Operation(summary = APIDocsHelper.CategoryAPI.SAVE_CATEGORY)
    @PostMapping
    public CategoryDTO create(@RequestBody CategoryDTO categoryDTO) {
        return this.categoryService.save(categoryDTO);
    }

    @Operation(summary = APIDocsHelper.CategoryAPI.UPDATE_CATEGORY)
    @PutMapping
    public CategoryDTO update(@RequestParam UUID id, @RequestBody CategoryDTO categoryDTO) {
        return this.categoryService.update(id, categoryDTO);
    }

    @Operation(summary = APIDocsHelper.CategoryAPI.GET_ALL_CATEGORY)
    @GetMapping("/all")
    public Collection<CategoryDTO> getAllCategories() {
        return this.categoryService.getAll();
    }

    @Operation(summary = APIDocsHelper.CategoryAPI.DELETE_CATEGORY)
    @DeleteMapping
    public String delete(UUID id) {
        return this.categoryService.delete(id);
    }
}
