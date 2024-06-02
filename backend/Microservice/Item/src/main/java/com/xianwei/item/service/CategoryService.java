package com.example.XianweiECommerce.service;
import com.example.XianweiECommerce.model.MainCategory;
import com.example.XianweiECommerce.model.SubCategory;
import com.example.XianweiECommerce.repository.MainCategoryRepository;
import com.example.XianweiECommerce.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final MainCategoryRepository mainCategoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Autowired
    public CategoryService(MainCategoryRepository mainCategoryRepository, SubCategoryRepository subCategoryRepository) {
        this.mainCategoryRepository = mainCategoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    public List<MainCategory> getAllMainCategories() {
        return mainCategoryRepository.findAll();
    }

    public List<SubCategory> getSubCategoriesByMainCategoryId(Long mainCategoryId) {
        return subCategoryRepository.findByMainCategoryId(mainCategoryId);
    }
}
