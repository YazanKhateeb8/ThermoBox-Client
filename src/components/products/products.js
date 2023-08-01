import './products.css';
import React, { useState, useEffect } from 'react';
import { fetchProducts , fetchMostSoldProducts } from '../../servicesApi/ProductsApi';
import CategoriesBar from '../categories-bar/CategoriesBar';
import { useParams } from "react-router-dom";
import DenseMenu from '../../assets/muiExtention/DenseMenu';
import BestSellerProducts from '../feature-products/bestsellerproducts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import ProductsWithDiscount from '../feature-products/productsWithDiscount';
import { Link } from 'react-router-dom'

import { addProductToCart  } from '../../servicesApi/CartApi';

export default function Products( { user } ) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts(selectedCategory);
      setProducts(fetchedProducts);

    };
    getProducts();
  }, [selectedCategory]);



  const handleSelectCategory = (category) => {
      setSelectedCategory(category);
     
  };

  const backToMain = () =>{
    setSelectedCategory(null)
    navigate(`/products`)

  }


  async function addToCart (userId , productId){
    await addProductToCart(userId , productId)
    alert("added to cart");
  }
  
  async function alertLogin () {
    alert("Should Login For Add to cart")
  }
  return (
    <>
    <div id='products-container'>
      <div className='side-bar-category'>
      <button className='btn-back' onClick={() =>backToMain()}><ArrowBackIcon /></button>
      <CategoriesBar onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />
      </div>
      
      {selectedCategory ?
       <div className="product-rows">
          {products.map((product) => (
            <div key={product.product_id} className="productt-item">
              {product.images.length > 0 && (
                <img
                  className="product-image"
                  src={product.images[0].image_url}
                  alt={product.name}
                />
              )}
              
              <h2 className="product-name">{product.name}</h2>
              <div className="card-footer">
              <div className='product-details'>
              <span className="text-title">Price: {product.price}$</span>
              <span className="product-rating">Rating: {product.rating}</span>
                </div>
                <Link 
                    to= {`/product/${product.product_id}`}
                    >
                      <button className='view-product'>view Product</button>
                </Link>
              {user ?
              <div className="add-cart-button" onClick={() => addToCart(user.id , product.product_id)}>
                <AddShoppingCartIcon />
              </div>
              :
              <div className="add-cart-button" onClick={() => alertLogin()}>
                <AddShoppingCartIcon />
              </div>
              }
              </div>
            </div>
          ))}
        </div>
        :
        <div className='feature-products'>
                      <ProductsWithDiscount user={user}/>
                      <BestSellerProducts user={user}/>
                      {/* <BestSellerProducts /> */}
                      </div>
}
                    
      </div>
    </>
  );
  
   
}


