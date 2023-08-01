import React, { useState, useEffect, useRef } from 'react';
import { fetchProductsWithDiscount } from '../../servicesApi/ProductsApi';
import './BestSellerProducts.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom'
import { addProductToCart  } from '../../servicesApi/CartApi';

export default function ProductsWithDiscount( { user } ) {
  const [productsWithDiscount, setProductsWithDiscount] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const productContainerRef = useRef(null);

  useEffect(() => {
    const getProductsWithDiscount = async () => {
      const fetchedProductsWithDiscount = await fetchProductsWithDiscount();
      setProductsWithDiscount(fetchedProductsWithDiscount);
    };
    getProductsWithDiscount();
  }, []);

  useEffect(() => {
    const productContainer = productContainerRef.current;
    const productItems = productContainer.getElementsByClassName('product-item');
    const firstProduct = productItems[0];
    let carouselInterval;

    const handleCarousel = () => {
      if (!isHovered) {
        const nextProductIndex = (currentPage + 1) % Math.ceil(productsWithDiscount.length / 4);
        const transformPercentage = nextProductIndex === 0 ? 0 : -(nextProductIndex * 100);

        productContainer.style.transition = 'transform 0.5s ease-in-out';
        productContainer.style.transform = `translateX(${0}%)`;

        const transitionEndHandler = () => {
          productContainer.style.transition = 'none';

          // Delay resetting the position by 50 milliseconds to prevent the glitch
          setTimeout(() => {
            productContainer.style.transform = 'translateX(0)';
          }, 55);

          setCurrentPage(nextProductIndex);
          productContainer.removeEventListener('transitionend', transitionEndHandler);
        };

        productContainer.addEventListener('transitionend', transitionEndHandler);
      }
    };

    const startCarousel = () => {
      carouselInterval = setInterval(handleCarousel, 3000);
    };

    const stopCarousel = () => {
      clearInterval(carouselInterval);
    };

    productContainer.addEventListener('mouseenter', stopCarousel);
    productContainer.addEventListener('mouseleave', startCarousel);
    startCarousel();

    return () => {
      productContainer.removeEventListener('mouseenter', stopCarousel);
      productContainer.removeEventListener('mouseleave', startCarousel);
      clearInterval(carouselInterval);
    };
  }, [productsWithDiscount, currentPage, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  async function addToCart (userId , productId){
    await addProductToCart(userId , productId)
    alert("added to cart");
  }
  
  async function alertLogin () {
    alert("Should Login For Add to cart")
  }

  return (
    <div id="bestProducts-container">
      <h1>Products With Discount 10% :</h1>
      <div
        className="product-row"
        ref={productContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="product-items">
          {productsWithDiscount.map((product, index) => (
            <div
              key={product.product_id}
              className={`product-item ${
                index < currentPage * 4 || index >= (currentPage + 1) * 4 ? 'hidden' : ''
              }`}
            >
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
                  <p className="text-title">Price: {product.price}$</p>
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
      </div>
    </div>
  );
}
