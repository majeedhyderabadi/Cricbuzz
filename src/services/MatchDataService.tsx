import axios from "axios";

const Base_url="http://localhost:7172/api/Sports"

export const getCricketMatch = async () => {
    const response = await axios.get(`${Base_url}/cricket/live`)
    return response.data.data
   
}

