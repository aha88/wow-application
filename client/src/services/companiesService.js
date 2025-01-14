import axios from 'axios';

const fetchCompaniesData = async (token) => {
    try {
        const response = await axios.get('/api/companies', {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch company data');
    }
};

const fetchCompanyID = async(token,id) => {
    try {
        const response = await axios.get(`/api/companies/${id}`, {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch company data');
    }
}

const addCompany = async(token,data) => {
    try {
        const response = await axios.post('/api/companies',data, {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch company data');
    }
}

export default { fetchCompaniesData,fetchCompanyID,addCompany };
