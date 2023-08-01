import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_ROUTE;

async function fetchAddress( user_id ){
    try {
        const response = await axios.get(`${serverUrl}/address/${user_id}`)
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}



async function addUserAddress(userId, address) {
    const data = {
      address: address.address,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country.value,
      phone_number: address.phone_number,
    };
  console.log(userId, address);
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
  
  

  async function updateAddress(userId, userAddress){
    const data = {
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      postal_code: userAddress.postal_code,
      country: userAddress.country,
      phone_number: userAddress.phone_number,
    };
    console.log(userId,userAddress);
    try {
      const response = await axios.put(`${serverUrl}/address/${userId}`, data);
      console.log("User address updated successfully:", response.data.message);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error updating user address:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  
  
  
  export {fetchAddress, addUserAddress , updateAddress}