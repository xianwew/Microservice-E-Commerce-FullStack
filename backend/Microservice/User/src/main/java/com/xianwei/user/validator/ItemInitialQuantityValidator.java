package com.example.XianweiECommerce.validator;

import com.example.XianweiECommerce.annotation.ItemValidInitialQuantity;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ItemInitialQuantityValidator implements ConstraintValidator<ItemValidInitialQuantity, ItemDTO> {

    @Override
    public void initialize(ItemValidInitialQuantity constraintAnnotation) {
    }

    @Override
    public boolean isValid(ItemDTO itemDTO, ConstraintValidatorContext context) {
        if (itemDTO.getId() == null) {
            return itemDTO.getQuantity() > 0;
        }
        return true;
    }
}

