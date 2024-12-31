const db = require('../db');


// get all employeee
const getAllEmployee = async (req, res) => {
  if ([2, 3, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }
  
    try {
        const employee = await db('employees')
        .select(
          'employees.id as employee_id',
          'employees.name as employee_name',
          'employees.email as employee_email',
          'employees.phone as employee_phone',
          'employees.whatapps as employee_whatsapp',
          'employees.telegram as employee_telegram',
          'employees.role_id as employee_role_id',
          'employees.status as employee_status',
          'employees.company_id',
          'employees.height',
          'employees.weight',
          'employees.gender',
          'roles.name as employee_role',
      )
      .join('roles', 'roles.id', 'employees.role_id');
  
      const transformedEmployee = employee.map(emp => ({
          id: emp.employee_id,
          name: emp.employee_name,
          email: emp.employee_email,
          company_id: emp.company_id,
          whatapps: emp.employee_whatsapp,
          telegram: emp.employee_telegram,
          height: emp.employee_height??0,
          weight: emp.employee_weight??0,
          gender: emp.employee_gender??'-',
          role: {
            role_id: emp.employee_role_id,
            role_name: emp.employee_role,
          },
          
      }));
      
        const dt = {
          status: res.statusCode,
          data: transformedEmployee,
          length: transformedEmployee.length,
        };
    
    res.json(dt);
      
        } catch (error) {
          console.error('Error retrieving employee:', error);
          res.status(500).send('Error retrieving employee');
        }
}

// get employee by company
const allEmployeeByCompany = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }
  
  const id = req.params.id
 
  try {
    const employee = await db('employees')
      .select(
          'employees.id as employee_id',
          'employees.name as employee_name',
          'employees.email as employee_email',
          'employees.phone as employee_phone',
          'employees.whatapps as employee_whatsapp',
          'employees.telegram as employee_telegram',
          'employees.role_id as employee_role_id',
          'employees.status as employee_status',
          'employees.company_id',
          'employees.height',
          'employees.weight',
          'employees.gender',
          'roles.name as employee_role',
      )
      .join('roles', 'roles.id', 'employees.role_id')
      .where('employees.company_id', id );
  
      const transformedEmployee = employee.map(emp => ({
          id: emp.employee_id,
          name: emp.employee_name,
          email: emp.employee_email,
          company_id: emp.company_id,
          whatapps: emp.employee_whatsapp,
          telegram: emp.employee_telegram,
          height: emp.employee_height??0,
          weight: emp.employee_weight??0,
          gender: emp.employee_gender??'-',
          role: {
            role_id: emp.employee_role_id,
            role_name: emp.employee_role,
          },
      }));
      
        const dt = {
          status: res.statusCode,
          data: transformedEmployee,
          length: transformedEmployee.length,
        };
    
    res.json(dt);

  } catch (error) {
    console.error('Error retrieving employee registration:', error);
    res.status(500).json('Employee registration not found');
  }
};

// id a customer
const idEmployee = async (req, res) => {
  if ([4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

    const id = req.params.id
   
    try {
      const employee = await db('employees')
        .select(
            'employees.id as employee_id',
            'employees.name as employee_name',
            'employees.email as employee_email',
            'employees.company_id',
            'employee_details.*',
            'departments.name as employee_dept ',
            'designations.name as employee_design',
            'designations.name as employee_design',
            'roles.name as employee_role',
        )
        .join('employee_details', 'employee_details.id', 'employees.employee_details_id')
        .join('departments', 'departments.id', 'employees.department_id')
        .join('categories', 'categories.id', 'employees.category_id')
        .join('roles', 'roles.id', 'employees.role_id')
        .join('designations', 'designations.id', 'employees.designation_id')
        .where({ 'employees.id':id });
        
        const transformedEmployee = employee.map(emp => ({
            id: emp.employee_id,
            name: emp.employee_name,
            email: emp.employee_email,
            company_id: emp.company_id,
            whatapps: emp.whatapps,
            telegram: emp.telegram,
            role_id: emp.role_id,
            designation_id: emp.employee_design,
            department_id: emp.employee_dept,
            role_id: emp.employee_role,
            employee_details: {
                id: emp.id,  
                address1: emp.address1,
                address2: emp.address2,
                postcode: emp.postcode,
                city: emp.city,
                country: emp.country,
                email: emp.email,
                phone: emp.phone,
                handphone: emp.handphone,
            }
        }));
        
          const dt = {
            status: res.statusCode,
            data: transformedEmployee,
            length: transformedEmployee.length,
          };
      
      res.json(dt);
  
    } catch (error) {
      console.error('Error retrieving employee registration:', error);
      res.status(500).send('Employee registration not found');
    } 
};

//id employee update 
const idEmployeeUpdate = async (req, res) => {

  
  const {
    name,
    email,
    phone,
    whatapps,
    telegram,
    company_id,
    role_id,
    department_id,
    designation_id,
    category_id,
    status
    } = req.body;
    
    const { id } = req.params;

  try {
    
    const updateEmployeeData = await db('employees')
    .where({id})
    .update(
      {
        name,
        email,
        phone,
        whatapps,
        telegram,
        department_id,
        designation_id,
        telegram,
        company_id,
        role_id,
        category_id,
        status
      });

      if(updateEmployeeData == 1){

        return res.status(201).json({
          status:  res.statusCode,
          message: 'Employee data update successfully',
        });
      }else{
        return res.json({
          status:  res.statusCode,
          message: 'Employee data update unsuccessfully',
        });
      }
       

  } catch(error) {
    console.error('Employee update fail or not found:', error);
    res.status(500).send('Employee update fail or not found')
  }
}

// id employee update details
const idEmployeeDetailsUpdate = async (req, res) => {
  const {
          name,
          company_id,
          address1,
          address2,
          postcode,
          city,
          country,
          email,
          phone,
          handphone,
    } = req.body;
    const { id } = req.params;

  try {
    
    const updateEmployeeData = await db('employee_details')
    .where('employee_id' , id)
    .update(
      {
        name,
        company_id,
        address1,
        address2,
        postcode,
        city,
        country,
        email,
        phone,
        handphone
      });

      if(updateEmployeeData == 1){
        return res.status(201).json({
          status:  res.statusCode,
          message: 'Employee data update successfully',
        });
      }else{
        return res.json({
          status:  res.statusCode,
          message: 'Employee data update unsuccessfully',
        });
      }
       
  } catch(error) {
    console.error('Employee update fail or not found:', error);
    res.status(500).send('Employee update fail or not found')
  }
}

const employeeAdd = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }
  const { 
    name,
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
    status
  } = req.body;

  try{
  
    const existing = await db('employees')
    .select('*')
    .where('email', email)
    .where('company_id', company_id)
    .first();

    if (existing) {
      res.status(405).json({msg :'This email is already registered!'})
    }else{

      const employee =  {
        name: name,
        bod: bod,
        email: email,
        phone: phone,
        whatapps: whatapps,
        telegram: telegram,
        role_id: role_id,
        designation_id: designation_id,
        department_id: department_id,
        category_id: category_id,
        company_id: company_id,
        employee_details_id: employee_details_id,
        user_id: user_id,
        status: status,
      };

      const adduser = await db('employees').insert(employee);
      
      // get latest ID employee
      const getId = await db('employees')
      .max('id as id')  
      .first();
      const newid = (parseFloat(getId.id));

      // insert employee details
      await db('employee_details').insert(
        {
          company_id: company_id,
          employee_id: newid
        }
      );
      
      // get latest ID employee details
      const getIdDetail = await db('employee_details')
      .max('id as id')  
      .first();
      const newidDetail = (parseFloat(getIdDetail.id));

      await db('employees')
      .where('id', newid)
      .update({ employee_details_id: newidDetail });


      if(adduser){
      res.status(201).json({ status: res.statusCode, data: 'This email is already registered!'})

      }else{
        res.status(405).json({msg :'Check all the input is already registered!'})
      }
      
    }

  } catch(error) {
    res.json({msg: 'Error message: '+error});
  }
}

module.exports = {
    getAllEmployee,
    allEmployeeByCompany,
    idEmployee,
    idEmployeeUpdate,
    idEmployeeDetailsUpdate,
    employeeAdd
  };