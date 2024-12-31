const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const getEcypt = `${user.id}${user.email}${password}`
    const isMatch = await bcrypt.compare(getEcypt, user.password);

    if (!isMatch) {
      return res.status(400).json({  status: 'unsuccess', message: 'Invalid email or password' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    //  sessionStorage.setItem('tkn',token);

    res.json({
      status: res.statusCode,
      message: 'Login successful',
      userID: user.id,
      token: token,
    });

  } catch (error) {
    console.error(error);
      res.status(500).json({
         status: 'invalid',
         message: 'Server error' 
      });
  }

};

// Get all users
const getAllUsers = async (req, res) => {

  try {
    const users = await db('users').select('*');

    const dt = {
      status: res.statusCode,
      data: users,
      lenght: users.length
  };

    res.json(dt);

  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
};

// Get all users with  suffix (example function)
const getUserId = async (req, res) => {
  const id = req.params.id;
  
  try {
    const user = await db('users').select('*').where({id});
    const data= [{
      'status': res.statusCode,
      'data': user,
      'lenght': user.length
      
    }];

    return res.json(data);
  
  } catch (error) {
    console.error('Error retrieving users:', error);
    return res.status(500).send('Error retrieving users');
  }

};

// add user for access
const addUserAccess = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  const {
    name,
    email,
    password,
    status,
    role_id,
  } = req.body;

  try {

 

    const existing = await db('users')
    .select('*')
    .where('email', email)
    .first();

  if (existing) {
   return res.status(405).json({msg :'This email is already registered!'})

  }else{
    
    const user = { name: name,
      email: email,
      status: status,
      role_id: role_id,
    };
    const [id] =  await db('users').insert(user);
    
    const getId = await db('users')
    .max('id as id')  
    .first();
    const newid = (parseFloat(getId.id));

    const passwordString = `${newid}${email}${password}`;
    const encryptedPassword = await bcrypt.hash(passwordString, 10); 
    
    await db('users')
    .where('id', newid)
    .update({ password: encryptedPassword });

    return res.status(201).json({ id, name, email });

  }

  } catch(error) {
    return res.status(500).send('Error add user');
  }


}

// delete user for access
const deleteUserAccess = async (req, res) => {
   if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  const { id } = req.params;

  try {

    const dtuser = await db('users')
    .where('id', id).del();

    if(dtuser) {
      return res.status(200).json({
        status: res.statusCode,
        message: `User with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(404).json({
        status: res.statusCode,
        message: 'User not found',
      });
    }

  } catch(error) {
    return res.status(500).send('Error delete user');
  }

}

// update user for access
const updateUserAccess = async (req,res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }
  
  try {
  const {
    name,
    status,
    role_id,
  } = req.body;
  const { id } = req.params;

    const user = { 
      name: name,
      status: status,
      role_id: role_id,
    };
    
    await db('users').update(user)
    .where('id', id);

    return res.status(201).json({ status: res.statusCode, msg: `Successfully update user ID ${id}` });

  } catch(error) {
    return res.status(500).send('Error update user');
  }
  
}

// update user for access
const updatePasswordUserAccess = async (req,res) => {
  const { password } = req.body;
  const { id } = req.params;
  
try {

    const getId = await db('users').where('id', id)
    .first();


    const passwordString = `${id}${getId.email}${password}`;
    const encryptedPassword = await bcrypt.hash(passwordString, 10); 
    
  
      await db('users')
      .where('id', id)
      .update({ password: encryptedPassword });

    return res.status(201).json({ msg: `User passowrd for user ID ${id}` });
    
  
  } catch(error) {
    return res.status(500).send('Error add user');
  }

}

const userEmployees = async (req,res) => {

  try {

  const user = await db('employees')
  .select('employees.*', 'employees.id as employee_id', 'companies.id as companyID', 'companies.name as company_name', 'companies.*')
  .join('companies', 'companies.id', 'employees.company_id')
  .where('employees.user_id', req.userAccess.id);

const transformeduser = user.map(({ 
  employee_id, employee_name, bod, email, phone, whatapps, telegram, role_id, 
  designation_id, department_id, category_id, company_id, employee_details_id, user_id, 
  companyID, company_name, registration_number, company_address, company_phone, company_email, company_status 
  }) => ({
    id: employee_id,
    name: employee_name,
    bod,
    email,
    phone,
    whatapps,
    telegram,
    role_id,
    designation_id,
    department_id,
    category_id,
    company_id,
    employee_details_id,
    user_id,
    company: {
      id: companyID,
      company_name,
      registration_number,
      company_address,
      phone: company_phone,
      email: company_email,
      status: company_status
    }
  }));

    return res.json({ status: res.statusCode, data: transformeduser, length: transformeduser.length})
    
  } catch(error) {
    return res.json({msg: 'Error getting data'})
  }

}


module.exports = {
  postLogin,
  getAllUsers,
  getUserId,
  userEmployees,
  addUserAccess,
  deleteUserAccess,
  updateUserAccess,
  updatePasswordUserAccess
};
