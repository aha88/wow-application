const db = require('../db');

const verifyUser = async (req, res, next) => {

    try {
        const user = await db('users')
            .join('employees', 'employees.user_id', 'users.id')
            .where('users.email', req.user.email)  
            .first(); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user doesn't exist
        }

        // Attach the user to the request object
        req.userAccess = {
            id: user.id,
            email: user.email,
            role_id: user.role_id,
            company_id: user.company_id
        };        
        
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ message: 'Server error' }); // Handle database errors
    }
};

module.exports = verifyUser;
