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
//                   **Employee**                                                                                                         //
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags:
 *       - Employee
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
 * /api/employee/company/{id}:
 *   get:
 *     summary: Retrieve all employee
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
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */

//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **Company**                                                                                                          //
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Retrieve all companies
 *     tags:
 *       - Company
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
 * /api/companies/company/{id}:
 *   get:
 *     summary: Retrieve company detail
 *     tags:
 *       - Company
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []   
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */

//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **Dashboard**                                                                                                        //
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/dashboardCount:
 *   get:
 *     summary: Retrieve all 
 *     tags:
 *       - Dashboard
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
 * /api/dashboard-company-count:
 *   get:
 *     summary: Retrieve all by condition base on company 
 *     tags:
 *       - Dashboard
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
 * /api/dashboard-company-count/{id}:
 *   get:
 *     summary: Retrieve all by condition base on company 
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []   
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */

//----------------------------------------------------------------------------------------------------------------------------------------//
//                   **Events**                                                                                                           //
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/events/upload-pic/{id}:
 *   post:
 *     summary: Upload a file to the server
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/upload-cert/{id}:
 *   post:
 *     summary: Upload a file to the server
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/add-events:
 *   post:
 *     summary: Upload a file to the server
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - details
 *               - status
 *             properties:
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               details:
 *                 type: string
 *                 example: "aizat com"
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Add submit successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/add-attandance:
 *   post:
 *     summary: Add attendance from company event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -  name
 *               -  bod
 *               -  email
 *               -  phone
 *               -  whatapps
 *               -  telegram
 *               -  role_id
 *               -  company_id
 *               -  height
 *               -  weight
 *               -  registration_date
 *               -  gender
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               bod:
 *                 type: string
 *                 example: "1992-12-12"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@rms"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               whatapps:
 *                 type: string
 *                 example: "123456789"
 *               telegram:
 *                 type: string
 *                 example: "123456789"
 *               role_id:
 *                 type: integer
 *                 example: 1    
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               height:
 *                 type: string
 *                 example: "170"
 *               weight:
 *                 type: string
 *                 example: "70"
 *               registration_date:
 *                 type: string
 *                 example: "2022-12-12"
 *     responses:
 *       200:
 *         description: Add submit successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/update-attandance/{id}:
 *   put:
 *     summary: Update attendance from company event
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -  name
 *               -  bod
 *               -  email
 *               -  phone
 *               -  whatapps
 *               -  telegram
 *               -  role_id
 *               -  company_id
 *               -  height
 *               -  weight
 *               -  registration_date
 *               -  gender
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               bod:
 *                 type: string
 *                 example: "1992-12-12"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@rms"
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               whatapps:
 *                 type: string
 *                 example: "123456789"
 *               telegram:
 *                 type: string
 *                 example: "123456789"
 *               role_id:
 *                 type: integer
 *                 example: 1    
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               height:
 *                 type: string
 *                 example: "170"
 *               weight:
 *                 type: string
 *                 example: "70"
 *               registration_date:
 *                 type: string
 *                 example: "2022-12-12"
 *     responses:
 *       200:
 *         description: update successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/update-events/{id}:
 *   put:
 *     summary: Update attendance from company event
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -  details
 *               -  status
 *             properties:
 *               details:
 *                 type: string
 *                 example: "Aizat"
 *               status:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: update successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve all by condition base on company 
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []   
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */
