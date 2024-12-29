const db = require('../db');

const userAccessPass = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await db('users')
        .where('id', id)  
        .first(); 
        
        console.log( {
            "req.userAccess.id": req.userAccess.id,
             "user.id": user.id,
             "req.userAccess.role_id": req.userAccess.role_id,
             "user.role_id" : user.role_id
        })
        
          //admin user
        if(req.userAccess.role_id === 1) {
            
           return next();  

            // individual user
        }else if(req.userAccess.id === user.id && req.userAccess.role_id === user.role_id) {

          return  next();  
          
          // not allowed to change for others
        }else if (req.userAccess.id != user.id && req.userAccess.role_id != user.role_id) {
            return res.status(400).json({ msg: 'You are not allowed to change data!' });
        }
        
    } catch (error) {
        console.error('Error verifying user access:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = userAccessPass;
