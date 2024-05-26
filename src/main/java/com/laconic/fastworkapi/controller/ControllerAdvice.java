package com.laconic.fastworkapi.controller;

import com.laconic.fastworkapi.exception.NotFoundException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {
    @ExceptionHandler(NotFoundException.class)
    ProblemDetail handleNotFoundException(NotFoundException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ProblemDetail handleValidationException(MethodArgumentNotValidException ex) {
//        var bindingResult = ex.getBindingResult();
//        String errorMessage = bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
//                .toList().toString();
//        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, errorMessage);
//    }
}
