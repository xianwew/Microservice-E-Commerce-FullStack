import SearchBar from "../../Compoents/SearchBar/SearchBar";
import CategoryCardHomePage from '../../Compoents/HomePage/CategoryCardHomePage';
import '../../../App.css'
import BrowseCategory from "../../Compoents/HomePage/BrowseCategory";
import React, { useState, useEffect } from 'react';
import { fetchMainCategories } from "../../service/CategoryService";
import SubCategoryList from "../../Compoents/HomePage/SubCategoryList";
import ShoppingItemCard from "../../Compoents/HomePage/ShoppingItemCard";

export default function HomePage() {
    const [mainCategories, setMainCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchMainCategories();
            setMainCategories(categories);
        };

        loadCategories();
    }, []);

    return (
        <div className="app-content" style={{ paddingTop: '30px' }}>
            <div style={{ margin: '20px 0px' }}>
                <SearchBar />
            </div>
            <CategoryCardHomePage
                categories={mainCategories}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}