package com.requirementyogi.cloud.common.dtos;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

public record ApplicationError(
    int status,
    String title,
    String message,
    List<String> errors,
    Instant date
) {

    public ApplicationError(int status, String title, String message, List<String> errors) {
        this(status, title, message, errors, Instant.now());
    }

    public ApplicationError(int status, String title, String message) {
        this(status, title, message, Collections.emptyList());
    }

}
