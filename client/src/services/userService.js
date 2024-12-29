import axios from 'axios';

const fetchUserData = async (userId, token) => {
    try {
        const response = await axios.post('/api/user',{ id: userId }, {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch user data');
    }
};

export default { fetchUserData };
