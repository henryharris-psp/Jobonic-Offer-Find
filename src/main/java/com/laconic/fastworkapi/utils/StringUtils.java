package com.laconic.fastworkapi.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class StringUtils {

    public static String getFullName(String firstName, String lastName) {
        return firstName.concat(" ").concat(lastName);
    }

}
