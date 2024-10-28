package com.requirementyogi.cloud.common.advices;

import com.requirementyogi.cloud.common.dtos.ApplicationError;
import java.util.List;

import com.requirementyogi.cloud.common.exceptions.ResourceAlreadyExistsException;
import com.requirementyogi.cloud.common.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApplicationError handleResourceNotFoundException(ResourceNotFoundException exception) {
        return new ApplicationError(HttpStatus.NOT_FOUND.value(), "Resource Not Found", exception.getMessage());
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApplicationError handleResourceAlreadyExistsException(ResourceAlreadyExistsException exception) {
        return new ApplicationError(HttpStatus.CONFLICT.value(), "Resource Already Exists", exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApplicationError handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<String> errors = exception.getBindingResult()
            .getFieldErrors()
            .stream()
            .map((error -> error.getField() + " " + error.getDefaultMessage()))
            .toList();

        return new ApplicationError(
            HttpStatus.BAD_REQUEST.value(),
            "Invalid Argument",
            "The provided argument is invalid.",
            errors
        );
    }

}
