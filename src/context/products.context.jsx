import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";
import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => { 
            const categoryMap = await getCategoriesAndDocuments("categories");
            console.log(categoryMap);
        }

        getCategoriesMap();
    },[]);

    const value = {products};
    return(
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
};