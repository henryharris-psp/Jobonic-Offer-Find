package com.laconic.fastworkapi.dto;

import com.laconic.fastworkapi.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 7709122150366640161L;
    private UUID id;
    private String name;

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
    }

    public Category updateCategory(Category category) {
        category.setName(this.getName());
        return category;
    }
}
