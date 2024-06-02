package com.example.XianweiECommerce.mapper;

import com.example.XianweiECommerce.dto.SubCategoryDTO;
import com.example.XianweiECommerce.model.SubCategory;

import java.sql.Timestamp;

public class SubCategoryMapper {
    public static SubCategoryDTO toDTO(SubCategory subCategory) {
        SubCategoryDTO subCategoryDTO = new SubCategoryDTO();
        subCategoryDTO.setId(subCategory.getId());
        subCategoryDTO.setMainCategoryId(subCategory.getMainCategory().getId());
        subCategoryDTO.setImageUrl(subCategory.getImageUrl());
        subCategoryDTO.setName(subCategory.getName());
        subCategoryDTO.setCreatedAt(Timestamp.valueOf(subCategory.getCreatedAt()));
        subCategoryDTO.setUpdatedAt(Timestamp.valueOf(subCategory.getUpdatedAt()));
        return subCategoryDTO;
    }

    public static SubCategory toEntity(SubCategoryDTO subCategoryDTO) {
        SubCategory subCategory = new SubCategory();
        subCategory.setImageUrl(subCategoryDTO.getImageUrl());
        subCategory.setName(subCategoryDTO.getName());
        return subCategory;
    }

    public static void updateEntityFromDTO(SubCategoryDTO subCategoryDTO, SubCategory subCategory) {
        subCategory.setImageUrl(subCategoryDTO.getImageUrl());
        subCategory.setName(subCategoryDTO.getName());
    }
}
