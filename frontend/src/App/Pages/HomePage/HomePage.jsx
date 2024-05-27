import SearchBar from "../../Compoents/SearchBar/SearchBar";
import CategoryCardHomePage from '../../Compoents/HomePage/CategoryCardHomePage';
import '../../../App.css'
import React, { useState, useEffect } from 'react';
import { fetchMainCategories } from "../../service/CategoryService";
import HomePageCarousal from "../../Compoents/HomePage/HomePageCarsoual";

export default function HomePage() {
    const [mainCategories, setMainCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [trendingItems, setTrendingItems] = useState([]);
    const [itemsOnSale, setItemsOnSale] = useState([]);
    const [justForYouItems, setJustForYouItems] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchMainCategories();
            setMainCategories(categories);
            if (categories.length > 0) {
                setSelectedCategory(categories[0].id);
            }
        };

        loadCategories();
        setTrendingItems([
            { image: 'https://via.placeholder.com/200', title: 'Trending Item 1', price: '29.99' },
            { image: 'https://via.placeholder.com/200', title: 'Trending Item 2', price: '49.99' },
            { image: 'https://via.placeholder.com/200', title: 'Trending Item 3', price: '19.99' },
        ]);

        setItemsOnSale([
            { image: 'https://via.placeholder.com/200', title: 'Sale Item 1', price: '9.99' },
            { image: 'https://via.placeholder.com/200', title: 'Sale Item 2', price: '14.99' },
            { image: 'https://via.placeholder.com/200', title: 'Sale Item 3', price: '24.99' },
        ]);

        setJustForYouItems([
            { image: 'https://via.placeholder.com/200', title: 'Just For You Item 1', price: '39.99' },
            { image: 'https://via.placeholder.com/200', title: 'Just For You Item 2', price: '59.99' },
            { image: 'https://via.placeholder.com/200', title: 'Just For You Item 3', price: '99.99' },
        ]);
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
            <div style={{display: 'flex', flexDirection: 'column', margin: '10px 0px 60px 0px'}}>
                <HomePageCarousal title="Trending Today" items={trendingItems} />
                <HomePageCarousal title="Items On Sale" items={itemsOnSale} />
                <HomePageCarousal title="Just For You" items={justForYouItems} />
            </div>
        </div>
    );
}