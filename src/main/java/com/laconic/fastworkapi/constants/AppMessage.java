package com.laconic.fastworkapi.constants;

import lombok.experimental.UtilityClass;

@UtilityClass
public class AppMessage {
    public final static String USER = "USER";
    public final static String CATEGORY = "CATEGORY";
    public final static String CLIENT = "CLIENT";
    public final static String JOB = "JOB";
    public final static String FREELANCER = "FREELANCER";
    public final static String SKILL = "SKILL";
    public final static String USER_EXPERIENCE = "USER EXPERIENCE";
    public final static String USER_EDUCATION = "USER EDUCATION";

    public final static String NOT_FOUND_FORMAT = "[%s] NOT FOUND WITH %s [%s]";
    public final static String DELETE_MESSAGE = "[%s] deleted successfully";
}
