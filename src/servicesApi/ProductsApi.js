import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_ROUTE;

async function fetchProducts(categories){
    const category = categories && categories.category_name ? categories.category_name : null;
    try {
        const url = `${serverUrl}/product/products${category ? `?category=${category}` : ''}`;
        const response = await axios.get(url);
        return response.data;
    }
    catch(err){
        console.log(err)
        return null
    }
}



async function fetchMostSoldProducts(){
    try {
        const response = await axios.get(`${serverUrl}/product/products/most-sold`);
        return response.data;
    }
    catch(err){
        console.log(err)
        return null
    }
}

async function fetchProductsWithDiscount(){
    try {
        const response = await axios.get(`${serverUrl}/product/products/discounted`);
        return response.data;
    }
    catch(err){
        console.log(err)
        return null
    }
}




async function fetchProductById( productID ){
    try {
        const response = await axios.get(`${serverUrl}/product/${productID}`);
        return response.data;
    }
    catch(err){
        console.log(err)
        return null
    }
}


export {fetchProducts ,fetchMostSoldProducts , fetchProductsWithDiscount , fetchProductById}