package com.requirementyogi.cloud.confluence.mappers;

import com.requirementyogi.cloud.confluence.dtos.RequirementDto;
import com.requirementyogi.cloud.confluence.entities.Requirement;
import org.mapstruct.Mapper;

@Mapper
public interface RequirementMapper {

    Requirement toEntity(RequirementDto requirementRequestDTO);

    RequirementDto toDto(Requirement player);

}
