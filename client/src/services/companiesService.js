import axios from 'axios';

const fetchCompaniesData = async (token) => {
    try {
        const response = await axios.get('/api/companies', {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch user data');
    }
};

export default { fetchCompaniesData };
