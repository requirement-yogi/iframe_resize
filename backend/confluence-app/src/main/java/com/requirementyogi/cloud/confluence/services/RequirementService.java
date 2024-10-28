package com.requirementyogi.cloud.confluence.services;

import com.atlassian.connect.spring.AtlassianHostUser;
import com.requirementyogi.cloud.common.exceptions.ResourceAlreadyExistsException;
import com.requirementyogi.cloud.common.exceptions.ResourceNotFoundException;
import com.requirementyogi.cloud.confluence.dtos.RequirementDto;
import com.requirementyogi.cloud.confluence.entities.Requirement;
import com.requirementyogi.cloud.confluence.mappers.RequirementMapper;
import com.requirementyogi.cloud.confluence.repositories.RequirementRepository;

import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequirementService {

    private final RequirementRepository requirementRepository;
    private final RequirementMapper requirementMapper;

    public Page<RequirementDto> findAll(AtlassianHostUser user, Long spaceId, Pageable pageable) {
        return requirementRepository
            .findAllByClientKeyAndSpaceId(user.getHost().getClientKey(), spaceId, pageable)
            .map(requirementMapper::toDto);
    }

    public RequirementDto find(AtlassianHostUser user, Long spaceId, String key) {
        return requirementRepository
            .findByClientKeyAndSpaceIdAndKey(user.getHost().getClientKey(), spaceId, key)
            .map(requirementMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("Requirement not found"));
    }

    public RequirementDto create(
        AtlassianHostUser user,
        Long spaceId,
        RequirementDto requirementDto
    ) {
        Optional<Requirement> optionalRequirement = requirementRepository
            .findByClientKeyAndSpaceIdAndKey(user.getHost().getClientKey(), spaceId, requirementDto.key());
        if (optionalRequirement.isPresent()) {
            throw new ResourceAlreadyExistsException("Requirement already exists");
        }
        Requirement requirement = requirementMapper.toEntity(requirementDto);
        requirementRepository.save(requirement);
        return requirementMapper.toDto(requirement);
    }

    public void delete(AtlassianHostUser user, Long spaceId, String key) {
        Optional<Requirement> optionalRequirement = requirementRepository
            .findByClientKeyAndSpaceIdAndKey(user.getHost().getClientKey(), spaceId, key);
        if (optionalRequirement.isEmpty()) {
            throw new ResourceNotFoundException("Requirement not found");
        }
        Requirement requirement = optionalRequirement.get();
        requirementRepository.delete(requirement);
    }

}
