import CategoriesMenu from '../../components/categories-menu/categories-menu.component';
import Categories from '../../components/categories-menu/categories.component';

const Home = () => {
    return (
        <Categories categories={CategoriesMenu}/>
    );
}

export default Home;