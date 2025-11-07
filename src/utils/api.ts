import axios from "axios";

export const URL = 'https://raw.githubusercontent.com/jenkinsyoung/database-json/refs/heads/main/evently.json'

export const getAllEvents = async() =>{
    try{
        const response = await axios.get(`${URL}`)
        return response.data
    } catch (error) {
    if (axios.isAxiosError(error)) {
            console.log('Axios error:', error.response?.data);
            console.log('Status:', error.response?.status);
        } else {
            console.log('Unexpected error:', error);
        }
    }
}