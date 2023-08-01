import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_ROUTE;

async function fetchProductInCart( user_id ){
    try {
        const response = await axios.get(`${serverUrl}/cart/cart?user_id=${user_id}`)
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}


async function fetchProductOrderItems( user_id ){
  try {
      const response = await axios.get(`${serverUrl}/cart/cart-items?user_id=${user_id}`)
      return response.data
  }
  catch(err){
      console.log(err)
      return null
  }
}


async function addProductToCart (user_id, product_id) {
    try {
        const response = await axios.post(`${serverUrl}/cart/add-to-cart`, {
          user_id,
          product_id,
        });
    
        console.log(response.data.message); // Product added to cart successfully
      } catch (error) {
        if (error.response) {
          console.error(error.response.data.error);
        } else {
          console.error('Error:', error.message);
        }
      }
}


async function removeProductFromCart (user_id, product_id) {
  try {
    const response = await axios.delete(`${serverUrl}/cart/remove-product`, {
      data: {
        user_id,
        product_id,
      },
    });
    
  
      alert(response.data.message); 
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error('Error:', error.message);
      }
    }
}


async function updateQuantityProduct(user_id, product_id, quantity) {
  try {
    const response = await axios.put(`${serverUrl}/cart/update-product-quantity`, {
      user_id, 
      product_id,
      quantity,
    });
  } 
  catch (error) {
    if (error.response) {
      console.error(error.response.data.error);
    } else {
      console.error('Error:', error.message);
    }
  }
}


async function addUserAddress(userId, address) {
  const data = {
    address: address.address,
    city: address.city,
    state: address.state,
    postal_code: address.postalCode,
    country: address.country.value,
    phone_number: address.phoneNumber,
  };
  try {
    const response = await axios.post(`${serverUrl}/address/${userId}`, data);
    console.log(response.data.message);
  } catch (error) {
    if (error.response) {
      console.error(error.response.data.error);
    } else {
      console.error('Error:', error.message);
    }
  }
}



async function userPlaceOrder (orderData) {
  const { user_id, products, total_amount, address_id } = orderData;
  try{
    const response = await axios.post(`${serverUrl}/cart/check-out` , {user_id , products, total_amount, address_id});
   console.log(response.data.message);
  } catch (error) {
    if (error.response) {
      console.error(error.response.data.error);
    } else {
      console.error('Error:', error.message);
    }
  }
}





export {fetchProductInCart, addProductToCart, removeProductFromCart, fetchProductOrderItems, updateQuantityProduct, addUserAddress, userPlaceOrder}