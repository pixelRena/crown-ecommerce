import CategoriesMenu from '../../components/directory/categories-menu.component';
import Directory from "../../components/directory/directory.component";

const Home = () => {
    return (
        <Directory categories={CategoriesMenu}/>
    );
}

export default Home;