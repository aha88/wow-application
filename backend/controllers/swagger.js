//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **USER**                                                                                                             //
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with their email and password, returning a JWT token on success.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "aizat"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token and user details.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - User
 *     security:
 *       - xTokenAuth: []   
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */


/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []  # This requires the x-token header
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user
 */

/**
 * @swagger
 * /api/user/employeesCompany:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - User
 *     security:
 *       - xTokenAuth: []   
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */

/**
 * @swagger
 * /api/user/add:
 *   post:
 *     summary: Update employee data
 *     tags:
 *       - User
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role_id
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               password:
 *                 type: string
 *                 example: "6789123123"
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */

/**
 * @swagger
 * /api/user/delete/{id}:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - User
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/user/update/{id}:
 *   post:
 *     summary: Update employee data
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - status
 *               - role_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               status:
 *                 type: string
 *                 example: "A"
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */

/**
 * @swagger
 * /api/user/updatePassword/{id}:
 *   post:
 *     summary: Update employee data
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "Aizat"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */

//----------------------------------------------------------------------------------------------------------------------------------------//
//                          **EMPLOYEE**                                                                                                  //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/employees:
 *  get:
 *    summary: Retreive all emlpoyees
 *    tags:
 *      - Employee
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/employeeCompany/{id}:
 *  get:
 *    summary: Retreive employee by user company ID
 *    tags:
 *      - Employee
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of employee
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: employee registration not found
 */

/**
 * @swagger
 * /api/employee/{id}:
 *  get:
 *    summary: Retreive employee by ID
 *    tags:
 *      - Employee
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of employee
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: employee registration not found
 */


/**
 * @swagger
 * /api/employees-leave-history/{id}/{company}:
 *  get:
 *    summary: Retrieve employee leave history by ID
 *    tags:
 *      - Employee
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the employee
 *        schema:
 *          type: integer
 *      - name: company
 *        in: path
 *        required: true
 *        description: The ID of the company
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Successfully retrieved
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Employee registration not found
 */


/**
 * @swagger
 * /api/employee_update/{id}:
 *   post:
 *     summary: Update employee data
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - bod
 *               - email
 *               - phone
 *               - whatapps
 *               - telegram
 *               - role_id
 *               - designation_id
 *               - department_id
 *               - category_id
 *               - company_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               phone:
 *                 type: string
 *                 example: "6789123123"
 *               whatapps:
 *                 type: string
 *                 example: "6789123123"
 *               telegram:
 *                 type: string
 *                 example: "16789123123"
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               designation_id:
 *                 type: integer
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */

/**
 * @swagger
 * /api/employee-details-update/{id}:
 *   post:
 *     summary: Update employee details data
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name,
 *               - company_id,
 *               - address1,
 *               - address2,
 *               - postcode,
 *               - city,
 *               - country,
 *               - email,
 *               - phone,
 *               - handphone,
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               address1:
 *                 type: string
 *                 example: "no1 jalan"
 *               address2:
 *                 type: string
 *                 example: ""
 *               postcode:
 *                 type: string
 *                 example: ""
 *               city:
 *                 type: string
 *                 example: "kl"
 *               country:
 *                 type: string
 *                 example: "MY"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aiz@perosnal.com"
 *               phone:
 *                 type: string
 *                 example: "131231231"
 *               handphone:
 *                 type: string
 *                 example: "4514121231"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */

/**
 * @swagger
 * /api/employee/add:
 *   post:
 *     summary: Update employee data
 *     tags:
 *       - Employee
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role_id
 *               - company_id
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               bod:
 *                 type: string
 *                 format: date
 *                 example: "1988-11-11"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               phone:
 *                 type: string
 *                 example: "6789123123"
 *               whatapps:
 *                 type: string
 *                 example: "6789123123"
 *               telegram:
 *                 type: string
 *                 example: "6789123123"
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               designation_id:
 *                 type: integer
 *                 example: 1
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               employee_details_id:
 *                 type: integer
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */



//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **LEAVES**                                                                                                             //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/leaves:
 *  get:
 *    summary: Retreive all leaves
 *    tags:
 *      - Leaves
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/leavesCompany:
 *  get:
 *    summary: Retreive all leaves by user company
 *    tags:
 *      - Leaves
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/leaves-history/{id}:
 *  get:
 *    summary: Retrieve employee leave history by ID
 *    tags:
 *      - Leaves
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the company
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Successfully retrieved
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Employee registration not found
 */

/**
 * @swagger
 * /api/user-history:
 *  get:
 *    summary: Retreive all leaves by company
 *    tags:
 *      - Leaves
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/approve-leave/{id}:
 *  get:
 *    summary: Get employee leave ID for update status
 *    tags:
 *      - Leaves
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the leave
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Successfully retrieved
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Employee registration not found
 */

/**
 * @swagger
 * /api/rejected-leave/{id}:
 *  get:
 *    summary: Get employee leave ID for update status
 *    tags:
 *      - Leaves
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the leave
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Successfully retrieved
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Employee registration not found
 */

/**
 * @swagger
 * /api/revoked-leave/{id}:
 *  get:
 *    summary: Get employee leave ID for update status
 *    tags:
 *      - Leaves
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the leave
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Successfully retrieved
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Employee registration not found
 */


//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **DEPARTMENTS**                                                                                                             //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/departments:
 *  get:
 *    summary: Retreive all departments
 *    tags:
 *      - Departments
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/departmentsCompany:
 *  get:
 *    summary: Retreive all departments by user company
 *    tags:
 *      - Departments
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/department/add:
 *  post:
 *    summary: Update department details data
 *    tags:
 *      - Departments
 *    security:
 *       - xTokenAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name,
 *              - company_id,
 *            properties:
 *              name:
 *                type: string
 *                example: "Non-Exec"
 *              company_id:
 *                type: integer
 *                example: 1
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Unauthorized request
 */

/**
 * @swagger
 * /api/department-update/{id}:
 *  post:
 *    summary: Update department details data
 *    tags:
 *      - Departments
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the department
 *        schema:
 *          type: integer
 *    security:
 *       - xTokenAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name,
 *              - company_id,
 *            properties:
 *              name:
 *                type: string
 *                example: "Non-Exec"
 *              company_id:
 *                type: integer
 *                example: 1
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Unauthorized request
 */

/**
 * @swagger
 * /api/department-delete/{id}:
 *  post:
 *    summary: Retreive all data
 *    tags:
 *      - Departments
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of department
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */


//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **DESIGNATIONS**                                                                                                             //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/designations:
 *  get:
 *    summary: Retreive all designations
 *    tags:
 *      - Designations
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/designationsCompany:
 *  get:
 *    summary: Retreive all designations by user company
 *    tags:
 *      - Designations
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/designation/add:
 *  post:
 *    summary: Update employee details data
 *    tags:
 *      - Designations
 *    security:
 *       - xTokenAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name,
 *              - company_id,
 *            properties:
 *              name:
 *                type: string
 *                example: "Non-Exec"
 *              company_id:
 *                type: integer
 *                example: 1
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Unauthorized request
 */

/**
 * @swagger
 * /api/designation-update/{id}:
 *  post:
 *    summary: Update designation details data
 *    tags:
 *      - Designations
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the designation
 *        schema:
 *          type: integer
 *    security:
 *       - xTokenAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name,
 *              - company_id,
 *            properties:
 *              name:
 *                type: string
 *                example: "Non-Exec"
 *              company_id:
 *                type: integer
 *                example: 1
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Unauthorized request
 */

/**
 * @swagger
 * /api/designation-delete/{id}:
 *  post:
 *    summary: Retreive all data
 *    tags:
 *      - Designations
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of designation
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */


//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **CATEGORIES**                                                                                                             //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/categories:
 *  get:
 *    summary: Retreive all categories
 *    tags:
 *      - Categories
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/categoriesCompany:
 *  get:
 *    summary: Retreive all categories by user company
 *    tags:
 *      - Categories
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */


/**
 * @swagger
 * /api/category/add:
 *  post:
 *    summary: Update employee details data
 *    tags:
 *      - Categories
 *    security:
 *       - xTokenAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name,
 *              - company_id,
 *            properties:
 *              name:
 *                type: string
 *                example: "Non-Exec"
 *              company_id:
 *                type: integer
 *                example: 1
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Unauthorized request
 */

/**
 * @swagger
 * /api/category-update/{id}:
 *  post:
 *    summary: Update category details data
 *    tags:
 *      - Categories
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the category
 *        schema:
 *          type: integer
 *    security:
 *       - xTokenAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name,
 *              - company_id,
 *            properties:
 *              name:
 *                type: string
 *                example: "Non-Exec"
 *              company_id:
 *                type: integer
 *                example: 1
 *    responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Unauthorized request
 */


/**
 * @swagger
 * /api/category-delete/{id}:
 *  get:
 *    summary: Retreive all data
 *    tags:
 *      - Categories
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of category
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */


//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **CUSTOMERS**                                                                                                             //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/customers:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/customer/{id}:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Customer registration not found
 */

/**
 * @swagger
 * /api/customers_delete/{id}:
 *  post:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/customers_update/{id}:
 *  post:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
*        schema:
*          type: object
*          required:
*            - name
*            - email
*            - phone
*            - national_id
*            - birth_of_date
*            - address
*            - status_id
*          properties:
  *            name:
  *              type: string
  *              example: "aizat"
  *            email:
  *              type: string
  *              format: email
  *              example: "aizat@email.com"
  *            phone:
  *              type: string
  *              example: "6789123123"
  *            national_id:
  *              type: integer
  *              example: 1
  *            birth_of_date:
  *              type: string
  *              format: date  # Changed to 'date' for clarity
  *              example: "1988-11-11"
  *            address:
  *              type: string
  *              example: "jalan 1, 46000 selangor"
  *            status_id:
  *              type: integer
  *              example: 1
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */