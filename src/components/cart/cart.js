import React, { useState, useEffect } from 'react';
import { fetchProductInCart, removeProductFromCart, fetchProductOrderItems, updateQuantityProduct } from '../../servicesApi/CartApi';
import './cart.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ user }) {
  const navigate = useNavigate(); // Add useNavigate to access the navigate function

  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderData , setOrderData] = useState([]);
  const [totalAmount , setTotalAmount] = useState(0);

  let totalPrice = 0 ;
  items.forEach((product) => {totalPrice += (parseFloat(product.price) * product.quantity)})


    



  useEffect(() => {
    const getProductsInCart = async () => {
      const fetchedProducts = await fetchProductInCart(user.id);
      const updatedProducts = fetchedProducts.map((product) => ({
        ...product
      }));
      setCartItems(updatedProducts);
    };
    getProductsInCart();
  }, [user.id]);

  useEffect(() => {
    const getProductsOrderItems = async () => {
      const fetchedItems = await fetchProductOrderItems(user.id);
      const updatedItems = fetchedItems.map((item) => ({
        ...item
      }));
      setItems(updatedItems);
    };
    getProductsOrderItems();
  }, [user.id]);

  const handleRemoveItem = async (index, productID) => {
    try {
      await removeProductFromCart(user.id, productID);
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      
      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts.splice(index, 1);
      setSelectedProducts(updatedSelectedProducts);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleIncreaseQuantity = async (index) => {
    const item = cartItems[index];
    const quantity = getItemQuantity(item.product_id) + 1;
  
    try {
      await updateQuantityProduct(user.id, item.product_id, quantity);
      const updatedItems = items.map((orderItem) =>
        orderItem.product_id === item.product_id ? { ...orderItem, quantity } : orderItem
      );
      setItems(updatedItems);

      const updatedSelectedProducts = [...selectedProducts];
      updatedSelectedProducts[index] = {
        product_id: item.product_id,
        quantity: quantity,
      };
      setSelectedProducts(updatedSelectedProducts);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const handleDecreaseQuantity = async (index) => {
    const item = cartItems[index];
    const quantity = getItemQuantity(item.product_id) - 1;
  
    try {
      if (quantity >= 1) { // Set the minimum value to 1
        await updateQuantityProduct(user.id, item.product_id, quantity);
        const updatedItems = items.map((orderItem) =>
          orderItem.product_id === item.product_id ? { ...orderItem, quantity } : orderItem
        );
        setItems(updatedItems);

        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts[index] = {
          product_id: item.product_id,
          quantity: quantity,
        };
        setSelectedProducts(updatedSelectedProducts);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const getItemQuantity = (productId) => {
    const correspondingItem = items.find((orderItem) => orderItem.product_id === productId);
    return correspondingItem ? correspondingItem.quantity : 0;
  };

  const handlePlaceOrder = () => {
    // Send the selected products to the payment page
    if( cartItems.length > 0 ) {
      const orderData = {
        user: user,
        products: cartItems,
        quantity: items,
        total_amount : totalPrice
        
      };
      setOrderData(orderData)  
      navigate('/payment', { state: { orderData : orderData } });
    }
    else {
      alert("No Product In Cart !")
    }
   
  };





  return (
    <div id="cart-container">
      <div className="menu-bar">
        <div className="menu-item">Name</div>
        <div className="menu-item">Price</div>
        <div className="menu-item">Quantity</div>
        <div className="menu-item">Remove</div>
      </div>
      {cartItems.map((item, index) => {
        const correspondingItem = items.find((orderItem) => orderItem.product_id === item.product_id);
        const quantity = correspondingItem ? correspondingItem.quantity : 0;

        return (
          <div className="cart-item" key={index}>
            <img src={item.images[0].image_url} className="product-image" alt="Product" />
            <div className="product-details">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">${item.price}</p>
              <div className='quantity'>
                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </div>
              <div className='remove-btn'>
                <button onClick={() => handleRemoveItem(index, item.product_id)}>
                  <DeleteIcon color='action' />
                </button>
              </div>
            </div>
          </div>
        );
      })}
            <h4 className='total'>Total Price : ${totalPrice.toFixed(2)}</h4>
            <button className="checkout-button" onClick={handlePlaceOrder}>Checkout</button>
    </div>
  );
}
