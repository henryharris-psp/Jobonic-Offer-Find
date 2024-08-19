package com.laconic.fastworkapi.exception;

import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.OracleDatabaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.net.URI;
import java.time.Instant;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ProblemDetail handleNotFoundException(RuntimeException ex, WebRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        return getProblemDetail(ex, request, problemDetail);
    }

    @ExceptionHandler(DocumentException.class)
    public ProblemDetail handleDocumentException(RuntimeException ex, WebRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.PAYLOAD_TOO_LARGE);
        return getProblemDetail(ex, request, problemDetail);
    }

    @ExceptionHandler(OracleDatabaseException.class)
    public ResponseEntity<ProblemDetail> handleOracleDatabaseException(OracleDatabaseException ex, WebRequest request) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.CONFLICT);
        problemDetail.setType(URI.create("DatabaseError"));

        String errorMessage = ex.getMessage();
        if (errorMessage.contains("ORA-00001: unique constraint")) {
            problemDetail.setProperty("message", "A record with this unique constraint already exists.");
        } else {
            problemDetail.setProperty("message", "An unexpected database error occurred.");
        }
        LOGGER.debug("[{}] exception thrown. [{}]. Additional Info: [{}]", ex.getClass().getSimpleName(),
                ex.getMessage(), request.getDescription(true));
        return ResponseEntity.status(HttpStatus.CONFLICT).body(problemDetail);
    }

    private ProblemDetail getProblemDetail(Exception ex, WebRequest request, ProblemDetail problemDetail) {
        problemDetail.setType(URI.create("Exception"));
        problemDetail.setProperty("message", ex.getMessage());
        problemDetail.setProperty("timestamp", Instant.now());
        LOGGER.debug("[{}] exception thrown. [{}]. Additional Info: [{}]", ex.getClass().getSimpleName(),
                     ex.getMessage(), request.getDescription(true));
        return problemDetail;
    }
}
