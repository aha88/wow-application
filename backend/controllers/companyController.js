const db = require('../db');


// get all employeee
const getAllCompanies = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
      }
       
      try {
        const companies = await db('companies')
          .select(
              'companies.id as company_id',
              'companies.name as company_name',
              'companies.registration_number as company_registration_number',
              'companies.phone as company_phone',
              'companies.email as company_email',
              'companies.status as company_status',
              'status_code.name as status_name'
          )
          .join('status_code', 'status_code.id', 'company_status');
          
          const transformedCompany = companies.map(comp => ({
              id: comp.company_id,
              name: comp.company_name,
              registration_number: comp.company_registration_number,
              email: comp.company_email,
              status: {
                id: comp.company_status,
                name: comp.status_name,
              }
          }));
          
            const dt = {
              status: res.statusCode,
              data: transformedCompany,
              length: transformedCompany.length,
            };
        
        res.json(dt);
    
      } catch (error) {
        console.error('Error retrieving company:', error);
        res.status(500).json('Company not found');
      }
}

// get company by id
const getCompanyDetailsID = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
      return res.status(405).json('You don\'t have the authorization');
    }
    
    const id = req.params.id
   
    try {
        const companies = await db('companies')
          .select(
              'companies.id as company_id',
              'companies.name as company_name',
              'companies.registration_number as company_registration_number',
              'companies.phone as company_phone',
              'companies.email as company_email',
              'companies.status as company_status',
              'status_code.name as status_name'
          )
          .join('status_code', 'status_code.id', 'company_status')
            .where('company_id', id );
      
          const transformedCompany = companies.map(comp => ({
              id: comp.company_id,
              name: comp.company_name,
              registration_number: comp.company_registration_number,
              phone: comp.company_phone,
              email: comp.company_email,
              status: {
                id: comp.company_status,
                name: comp.status_name,
              }
          }));
          
            const dt = {
              status: res.statusCode,
              data: transformedCompany,
              length: transformedCompany.length,
            };
        
        res.json(dt);
    
      } catch (error) {
        console.error('Error retrieving Company:', error);
        res.status(500).json('Company not found');
      }
  };

module.exports = {
    getAllCompanies,
    getCompanyDetailsID
  };