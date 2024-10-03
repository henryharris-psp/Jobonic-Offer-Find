package com.laconic.fastworkapi.dto.pagination;

import com.laconic.fastworkapi.enums.SortOrder;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


import java.io.Serial;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PageAndFilterDTO<T extends SearchAndFilterDTO> implements Serializable {
    @Serial
    private static final long serialVersionUID = 8861011440988964830L;

    @Schema(example = "1")
    @Builder.Default
    private int pageNumber = 1;

    @Schema(example = "100")
    @Builder.Default
    private int pageSize = 100;

    @Schema(example = "columnToSort")
    private String sortBy;

    @Schema(example = "DESC")
    private SortOrder sortOrder;

    private T filter;

    private Long authId;

    private Boolean postedByAuthUser;

    @Hidden
    public PageRequest getPageRequest() {
        if(sortBy != null && !sortBy.isEmpty() && !sortBy.equals("string")) {
            return PageRequest.of(pageNumber - 1, pageSize, sortOrder == SortOrder.ASC ? Sort.Direction.ASC :
                    Sort.Direction.DESC, sortBy);
        }

        return PageRequest.of(pageNumber - 1, pageSize);
    }
}
