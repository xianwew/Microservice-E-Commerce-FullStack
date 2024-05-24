import SearchBar from "../../Compoents/SearchBar/SearchBar";
import CategoryCardHomePage from '../../Compoents/HomePage/CategoryCardHomePage';
import '../../../App.css'
import BrowseCategory from "../../Compoents/HomePage/BrowseCategory";

export default function HomePage() {
    return (
        <div className="app-content" style={{ paddingTop: '30px' }}>
            <div style={{ margin: '20px 0px' }}>
                <SearchBar />
            </div>
            <CategoryCardHomePage />
            <div style={{ margin: '20px 0px' }}>
                <BrowseCategory />
            </div>
        </div>
    );
}