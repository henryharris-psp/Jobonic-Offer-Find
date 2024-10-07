package com.laconic.fastworkapi.dto.pagination;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class SearchAndFilterMultipleKeywordDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -6013998079372476944L;
    private String[] searchKeyword;
    private String categoryId;
    private String minPricePerHour;
    private String maxPricePerHour;
    private String deadlineDate;
}
