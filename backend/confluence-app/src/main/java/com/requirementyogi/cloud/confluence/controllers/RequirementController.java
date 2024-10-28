package com.requirementyogi.cloud.confluence.controllers;

import com.atlassian.connect.spring.AtlassianHostUser;
import com.atlassian.connect.spring.ContextJwt;
import com.requirementyogi.cloud.confluence.services.RequirementService;
import com.requirementyogi.cloud.confluence.dtos.RequirementDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/spaces/{spaceId}/requirements")
@RequiredArgsConstructor
public class RequirementController {

    private final RequirementService requirementService;

    @GetMapping
    @ContextJwt
    public Page<RequirementDto> findAll(
        @AuthenticationPrincipal AtlassianHostUser user,
        @PathVariable Long spaceId,
        Pageable pageable
    ) {
        return requirementService.findAll(user, spaceId, pageable);
    }

    @PostMapping
    @ContextJwt
    @ResponseStatus(HttpStatus.CREATED)
    public RequirementDto create(
        @AuthenticationPrincipal AtlassianHostUser user,
        @PathVariable Long spaceId,
        @Valid @RequestBody RequirementDto requirementDto
    ) {
        return requirementService.create(user, spaceId, requirementDto);
    }

    @GetMapping("/{key}")
    @ContextJwt
    public RequirementDto find(
        @AuthenticationPrincipal AtlassianHostUser user,
        @PathVariable Long spaceId,
        @PathVariable String key
    ) {
        return requirementService.find(user, spaceId, key);
    }

    @DeleteMapping("/{key}")
    @ContextJwt
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @AuthenticationPrincipal AtlassianHostUser user,
        @PathVariable Long spaceId,
        @PathVariable String key
    ) {
        requirementService.delete(user, spaceId, key);
    }

}
