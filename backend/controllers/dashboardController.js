const db = require('../db');

// div counter
const counterContainer = async (req, res) => {
    try {
        const employeeCounts = await db('employees')
        .select(
          'company_id',
          db.raw('COUNT(*) as count')
        )
        .groupBy('company_id');
      
        const totalEmployees = await db('employees')
            .count('* as total')
            .first();
        
        const transformedDash = [
            {
                employee: employeeCounts.map(record => ({
                    employee_count: record.count,
                    company: record.company_id,
                })),
            },
            {
                all_employee_count: totalEmployees.total,
                company: 'All',
            },
        ];
      
        const dt = {
          status: res.statusCode,
          data: transformedDash,
          length: transformedDash.length,
        };
    
        res.json(dt);
      
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).send('Error retrieving employee');
    }
}

const counterConditionGeneral = async (req,res) => {

    const id = req.body.id;

    try{

        const employeeCounts = await db('checkup')
        .select('condition_type.name as conditionName', db.raw('COUNT(*) as count'))
        .join('condition_type', 'condition_type.checkup_id', 'checkup.id')
        .groupBy('condition_type.name')
        .orderBy('count', 'desc');
      
        const dt = {
          status: res.statusCode,
          data: employeeCounts,
          length: employeeCounts.length,
        };
    
        res.json(dt);
    
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).send('Error retrieving employee');
    }
    
}

const counterConditionByCompany = async (req,res) => {

    const id = req.params.id;

    try{

        const employeeCounts = await db('checkup')
        .select('condition_type.name as conditionName', db.raw('COUNT(*) as count'))
        .join('condition_type', 'condition_type.checkup_id', 'checkup.id')
        .where('checkup.company_id', id)
        .groupBy('condition_type.name')
        .orderBy('count', 'desc');
      
        const dt = {
          status: res.statusCode,
          data: employeeCounts,
          length: employeeCounts.length,
        };
    
        res.json(dt);
    
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).send('Error retrieving employee');
    }
    
}

module.exports = {
    counterContainer,
    counterConditionGeneral,
    counterConditionByCompany
}