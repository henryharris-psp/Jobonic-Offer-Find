package com.laconic.fastworkapi.dto.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchAndFilterDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -6013998079372476944L;
    private String searchKeyword;
    private String serviceType;
}
