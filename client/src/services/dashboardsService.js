import axios from 'axios';

const fetchDashboardData = async (token) => {
    try {
        const response = await axios.get('/api/dashboard', {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
    }
};

const fetchDashboardCountCondition = async (token) => {
    try {
        const response = await axios.get('/api/dashboardConditionCount', {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
    }
};

const dashboardCountID = async (token,id) => {
    try {
        const response = await axios.get(`/api/dashboardCountID/${id}`, {   
            headers: {
                'x-token': token,   
        }});
        return response.data;   
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
    }
};

export default { 
    fetchDashboardData,
    fetchDashboardCountCondition,
    dashboardCountID 
};
