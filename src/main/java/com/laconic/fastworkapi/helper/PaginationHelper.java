package com.laconic.fastworkapi.helper;

import com.laconic.fastworkapi.dto.pagination.PaginationDTO;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;

import java.util.List;

@UtilityClass
public class PaginationHelper {
    public static <S, T> PaginationDTO<S> getResponse(Page<T> page, List<S> content) {
        return new PaginationDTO<>(page.getNumber() + 1,
                                   page.getSize(),
                                   page.getTotalPages(),
                                   page.getTotalElements(),
                                   content,
                                   page.isLast());
    }
}
