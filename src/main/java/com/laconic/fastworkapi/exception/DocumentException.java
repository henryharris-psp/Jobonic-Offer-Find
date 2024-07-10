package com.laconic.fastworkapi.exception;

import java.io.Serial;

public class DocumentException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = -4964945376648735543L;

    public DocumentException() {
        super();
    }

    public DocumentException(String message) {
        super(message);
    }
}
