package com.laconic.fastworkapi.dto.pagination;

import java.util.List;
import java.util.UUID;

public record PaginationDTO<T>(
        int pageNo,
        int pageSize,
        int totalPages,
        long totalElements,
        List<T> content,

        boolean last
) {}

