import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_ROUTE;

async function fetchOrders( user_id ){
    try {
        const response = await axios.get(`${serverUrl}/order/${user_id}`)
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}

export {fetchOrders}