package com.laconic.fastworkapi.repo.specification;

import com.laconic.fastworkapi.entity.ServiceManagement;
import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@UtilityClass
public class GenericSpecification {
    public static <T> Specification<T> hasKeyword(String keyword, Set<String> columns) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            String lowerKeyword = "%" + keyword.toLowerCase() + "%";

            // Create an array of predicates for each column
            var predicates = columns.stream()
                    .map(column -> criteriaBuilder.like(criteriaBuilder.lower(root.get(column)), lowerKeyword))
                    .toArray(jakarta.persistence.criteria.Predicate[]::new);

            // Combine the predicates using 'or'
            return criteriaBuilder.or(predicates);
        };
    }

    public static <T> Specification<T> hasKeyword(LocalDateTime keyword, Set<String> columns) {
        return (root, query, criteriaBuilder) -> {
            if (keyword == null) {
                return criteriaBuilder.conjunction();
            }

            // Create an array of predicates for each column
            var predicates = columns.stream()
                    .map(column -> criteriaBuilder.equal(root.get(column), keyword))
                    .toArray(Predicate[]::new);

            // Combine the predicates using 'or'
            return criteriaBuilder.or(predicates);
        };
    }

    public static Specification<ServiceManagement> hasKeywords(String[] keywords, Set<String> fields) {
        return (root, query, criteriaBuilder) -> {
            if (keywords == null || keywords.length == 0) {
                return criteriaBuilder.conjunction(); // No keywords, match everything
            }

            List<Predicate> keywordPredicates = new ArrayList<>();

            // Loop through each keyword and match across all fields
            for (String keyword : keywords) {
                List<Predicate> fieldPredicates = new ArrayList<>();
                for (String field : fields) {
                    fieldPredicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get(field)),
                            "%" + keyword.toLowerCase() + "%"
                    ));
                }
                // Combine OR predicates for each field for the current keyword
                keywordPredicates.add(criteriaBuilder.or(fieldPredicates.toArray(new Predicate[0])));
            }

            // Combine all keyword predicates using OR, so that any keyword matches any field
            return criteriaBuilder.or(keywordPredicates.toArray(new Predicate[0]));
        };
    }
}
