import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_ROUTE;


async function emailLogin(signInData){
    try{
        const result = await axios.post(`${serverUrl}/auth/login`, signInData)
        return result.data.token
    }
    catch(err){
        if(err.response.status === 400) throw new Error("Invalid Credentials.")
        if(err.response.status === 404) throw new Error("Incorrect Email / Password.")
        if(err.response.status === 500) throw new Error("Log In Failed.")
        else throw new Error(err)
    }
}

async function emailSignUp(signUpData){
    try{
        const result = await axios.post(`${serverUrl}/auth/signup?isAdmin=`, signUpData)
        return result.data.token
    }
    catch(err){
        if(err.response.status === 400) throw new Error("User Already Exists.")
        else throw new Error(err)
    }
}

async function fetchUser(token){
    try {
        const response = await axios.get(`${serverUrl}/auth/user`, { headers: {"Authorization" : `Bearer ${token}`} })
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}



async function updateUser(userId, userDetails){
    const data = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
        phoneNumber: userDetails.phoneNumber,
    };
    console.log(userId,userDetails);
    try {
      const response = await axios.put(`${serverUrl}/auth/${userId}`, data);
      console.log("User address updated successfully:", response.data.message);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error updating user address:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  

async function fetchAdmin(token){
    try {
        const response = await axios.get(`${serverUrl}/auth/company`, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}


export {fetchUser, fetchAdmin, emailSignUp, emailLogin, updateUser}