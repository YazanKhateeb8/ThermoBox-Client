import './productPage.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../../servicesApi/ProductsApi';
import ProductsWithDiscount from '../feature-products/productsWithDiscount';
import { addProductToCart  } from '../../servicesApi/CartApi';
import { useNavigate } from 'react-router-dom';

export default function ProductPage( {user}) {
  const [product, setProduct] = useState([]);
  const { productID } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const fetchedProduct = await fetchProductById(productID);
      setProduct(fetchedProduct);
    };
    getProduct();
  }, [productID]);

  const { product_id, name, description, price, rating, quantity, images, size } = product;



  async function addToCart(userId, productId, className) {
    if (className === "add-to-cart-btn") {
      await addProductToCart(userId, productId);
      alert("added to cart");
    } else {
      await addProductToCart(userId, productId);
      await navigate('/cart'); 
    }
  }
  
  
  async function alertLogin () {
    alert("Should Login For Add to cart")
  }
  return (
    <>
      <div id="product-page">
        <div className="product-image">
          {images && images.length > 0 && <img src={images[0].image_url} alt={name} />}
        </div>
        <div className="product-details">
        <Link to="/products" className="back-link">Back to Products</Link>
          <h2 className="product-name">{name}</h2>
          <p className="product-description">{description}</p>
          <div className='product-deatils'>
          <p className="product-price">Price: ${price}</p>
          <p className="product-quantity">Quantity: {quantity}</p>
          <p className="product-size">Size: {size}</p>
          <div className="rating">
                <input value="5" name="rating" id="star5" type="radio"/>
                <label for="star5"></label>
                <input value="4" name="rating" id="star4" type="radio"/>
                <label for="star4"></label>
                <input value="3" name="rating" id="star3" type="radio"/>
                <label for="star3"></label>
                <input value="2" name="rating" id="star2" type="radio"/>
                <label for="star2"></label>
                <input value="1" name="rating" id="star1" type="radio"/>
                <label for="star1"></label>
            </div>
          
          </div>
          {user ?
             <div className='buttons'>
               <Link
                  to="/cart">
                   <button className="buy-now-btn" onClick={() => addToCart(user.id , product_id , "buy-now-btn")}>Buy It Now</button>
                </Link>
            


             <button className="add-to-cart-btn" onClick={() => addToCart(user.id , product_id , "add-to-cart-btn")}>Add to Cart</button>
             </div>
              :
              <div className="add-cart-button" onClick={() => alertLogin()}>
                <div className='buttons'>
          <button className="add-to-cart-btn">Buy It Now</button>
          <button className="add-to-cart-btn">Add to Cart</button>
          </div>
              </div>
              }
          
          
        </div>
      </div>
      <div className="ads">
        <ProductsWithDiscount user={user} />
      </div>
    </>
  );
}
