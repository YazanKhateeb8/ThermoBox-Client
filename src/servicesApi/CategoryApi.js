import axios from 'axios'
const serverUrl = process.env.REACT_APP_SERVER_ROUTE;

async function fetchCategories(){
    try {
        const response = await axios.get(`${serverUrl}/category`)
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}



export {fetchCategories}