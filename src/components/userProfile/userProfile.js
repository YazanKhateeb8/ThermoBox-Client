import React, { useState, useEffect } from "react";
import "./userProfile.css";
import { fetchAddress, updateAddress } from "../../servicesApi/AddressApi"
import { updateUser } from "../../servicesApi/AuthApi"


export default function UserProfile({ user }) {
  const [userDetails, setUserDetails] = useState(user);
  const [userAddress, setUserAddress] = useState({});
  const [existAddress , setExistAddress] = useState(false);
  const [addressChanged, setAddressChanged] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressData = await fetchAddress(user.id);
        if (addressData) {
          setUserAddress(addressData);
          setExistAddress(true)
        }
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };

    fetchData();
  }, [user.id]);

  const handleUserDetailsChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserAddressChange = (event) => {
    setUserAddress({
      ...userAddress,
      [event.target.name]: event.target.value,
    });
    setAddressChanged(true);
  };



  const handleSave  = async () => {
    try {
      if (addressChanged) {
        // Make the API call to update the user address only if it has been changed
        await updateAddress(user.id, userAddress);
        setAddressChanged(false);

      }
      await updateUser(user.id, userDetails);
    } catch (error) {
      // Handle the error if needed
      console.error("Error updating user address:", error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-container">
      <div className="user-details">
        <h2>User Profile</h2>
          <label htmlFor="name">FirstName:</label>
          <input
            type="text"
            id="name"
            name="firstName"
            value={userDetails.firstName || ""}
            onChange={handleUserDetailsChange}
            className="user-profile-input"
          />

          <label htmlFor="lastName">LastName:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userDetails.lastName || ""}
            onChange={handleUserDetailsChange}
            className="user-profile-input"
          />
       
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userDetails.email || ""}
            onChange={handleUserDetailsChange}
            className="user-profile-input"
          />
       
       
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetails.password || ""}
            onChange={handleUserDetailsChange}
            className="user-profile-input"
          />


          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userDetails.phoneNumber || ""}
            onChange={handleUserDetailsChange}
            className="user-profile-input"
          />
      </div>

{existAddress && 
      <div className="user-address">
        <h2>Address</h2>
          <label htmlFor="address">Street:</label>
          <input
            type="text"
            id="street"
            name="address"
            value={userAddress.address || ""}
            onChange={handleUserAddressChange}
            className="user-profile-input"
          />
      
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={userAddress.city || ""}
            onChange={handleUserAddressChange}
            className="user-profile-input"
          />


          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={userAddress.state || ""}
            onChange={handleUserAddressChange}
            className="user-profile-input"
          />
       
          <label htmlFor="postal_code">Postal Code:</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={userAddress.postal_code || ""}
            onChange={handleUserAddressChange}
            className="user-profile-input"
          />

          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={userAddress.country || ""}
            onChange={handleUserAddressChange}
            className="user-profile-input"
          />
      </div>
    }
      </div>

      <button onClick={handleSave} className="user-profile-save-button">
        Save
      </button>
      
    </div>
  );
}
