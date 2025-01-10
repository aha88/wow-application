import axios from 'axios';

const fetcheventIDdData = async (token,id) => {
    try {
        const response = await axios.get(`/api/events/${id}`, {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch event data');
    }
};

 
 
export default { 
    fetcheventIDdData,
};
