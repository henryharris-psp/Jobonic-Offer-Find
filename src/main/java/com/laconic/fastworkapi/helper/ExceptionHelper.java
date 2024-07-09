package com.laconic.fastworkapi.helper;

import com.laconic.fastworkapi.constants.AppMessage;
import com.laconic.fastworkapi.exception.NotFoundException;
import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

@UtilityClass
public class ExceptionHelper {

    /**
     * Provide search attribute, entityName and search parameter
     */
    public static Supplier<NotFoundException> throwNotFoundException(String attribute, String placeholder, String parameter) {
        return () -> new NotFoundException(String.format(AppMessage.NOT_FOUND_FORMAT, attribute, placeholder,
                                                         parameter));
    }

}