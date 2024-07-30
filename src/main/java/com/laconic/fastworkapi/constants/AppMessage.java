package com.laconic.fastworkapi.constants;

import lombok.experimental.UtilityClass;

@UtilityClass
public class AppMessage {
    public static final int DEFAULT_FILE_SIZE_IN_MB = 20;
    public final static String USER = "USER";
    public final static String CATEGORY = "CATEGORY";
    public final static String CLIENT = "CLIENT";
    public final static String ROLE = "ROLE";
    public final static String JOB = "JOB";
    public final static String FREELANCER = "FREELANCER";
    public final static String SKILL = "SKILL";
    public final static String USER_EXPERIENCE = "USER EXPERIENCE";
    public final static String USER_EDUCATION = "USER EDUCATION";
    public final static String SERVICE = "SERVICE";
    public final static String PROPOSAL = "PROPOSAL";
    public final static String ATTACHMENT = "ATTACHMENT";
    public final static String SERVICE_REQUEST = "SERVICE REQUEST";
    public final static String SERVICE_OFFER = "SERVICE OFFER";

    public final static String FREELANCER_RECEIPT = "FREELANCER RECEIPT";
    public final static String EMPLOYER_PAYMENT = "EMPLOYER PAYMENT";
    public final static String MATCHES = "MATCHES";
    public final static String NOT_FOUND_FORMAT = "[%s] NOT FOUND WITH %s [%s]";
    public final static String DELETE_MESSAGE = "[%s] deleted successfully";
    public final static String SAVE_MESSAGE = "[%s] saved successfully";
    public static final String DOCUMENT_NOT_FOUND = "File not found";
}
