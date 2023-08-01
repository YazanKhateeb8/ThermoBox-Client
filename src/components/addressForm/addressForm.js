import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./addressForm.css";
import { fetchAddress, addUserAddress } from "../../servicesApi/AddressApi";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';


const AddressForm = ({ user, setLocation, handleNext }) => {

  const [address, setAddress] = useState({
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: null,
    phone_number: ""
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [existingAddress, setExistingAddress] = useState(null);
  const [showExistingAddress, setShowExistingAddress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressData = await fetchAddress(user.id);
        if (addressData) {
          setExistingAddress(addressData);
          setAddress(addressData);
          setLocation(addressData)
          setShowExistingAddress(true);
        }
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };

    fetchData();
  }, [user.id]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data.map((country) => ({
        value: country.name.common,
        label: country.name.common
      }));
      countries.sort((a, b) => a.label.localeCompare(b.label)); // Sort countries alphabetically
      setCountryOptions(countries);
    } catch (error) {
      console.log("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      country: selectedOption
    }));
  };

  const handlePhoneChange = (value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      phone_number: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addUserAddress(user.id, address);
      setLocation(address);
      console.log(address);
      handleNext();
    } catch (error) {
      console.error("Error adding user address:", error);
    }
  };

  const handleAddNewAddress = () => {
    setAddress({
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: null,
      phone_number: ""
    });
    setShowExistingAddress(false);
  };

  return (
    <div>
      {showExistingAddress ? (
        <div className="address-container">
        <div className="inline">
          <h2>Existing Address</h2>
          <button className="add-address-btn" onClick={handleAddNewAddress}>
            <AddLocationAltIcon />
          </button>
        </div>
        <div className="address-details">
          <p>
            <span>Street:</span> {existingAddress.address}
          </p>
          <p>
            <span>City:</span> {existingAddress.city}
          </p>
          <p>
            <span>State:</span> {existingAddress.state}
          </p>
          <p>
            <span>Postal Code:</span> {existingAddress.postal_code}
          </p>
          <p>
            <span>Country:</span> {existingAddress.country}
          </p>
          <p>
            <span>Phone Number:</span> +{existingAddress.phone_number}
          </p>
        </div>
        <button className="cnt-btn" onClick={handleNext}>
          Continue with this address
        </button>
      </div>
      
      ) : (
        <form className="address-form" onSubmit={handleSubmit}>

          {/* <button className="back-btn" onClick={handleBack}> back </button> */}

          <label>Street</label>
          <input
            type="text"
            name="address"
            value={address.address}
            onChange={handleChange}
            required
          />

          <label>City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />

          <label>State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
          />

          <label>Postal Code</label>
          <input
            type="text"
            name="postal_code"
            value={address.postal_code}
            onChange={handleChange}
            required
          />

          <label>Country</label>
          <Select
            name="country"
            value={address.country}
            options={countryOptions}
            onChange={handleCountryChange}
            required
          />

          <label>Phone Number</label>
          <PhoneInput
            country={address.country && address.country.value}
            value={address.phone_number}
            onChange={handlePhoneChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddressForm;
