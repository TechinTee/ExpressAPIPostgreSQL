import Express from "express";

import * as userController from "../controllers/userController";

const router = Express.Router();

/**
* @swagger
* tags:
*  name: Users
*  description: API for managing users
*/

/**
* @swagger
* /api/users/registerUser:
*  post:
*   summary: Register a new user
*   tags: [Users]
*   requestBody:
*      required: true
*      content:
*        application/json:
*         schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 example: "John"
*               password:
*                 type: string
*                 example: "password123456"
*               fullname:
*                 type: string
*                 example: "John Doe"
*               email:
*                 type: string
*                 example: "john.doe@example.com"
*               tel:
*                 type: string
*                 example: "0999999999"
*   responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.post('/registerUser', userController.registerUser)


/**
* @swagger
* /api/users/loginUser:
*  post:
*   summary: login a user
*   tags: [Users]
*   requestBody:
*      required: true
*      content:
*        application/json:
*         schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 example: "John"
*               password:
*                 type: string
*                 example: "password123456"
*   responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.post('/loginUser', userController.loginUser)

/**
* @swagger
* /api/users/refreshToken:
*  post:
*   summary: RefreshToken a user
*   tags: [Users]
*   requestBody:
*      required: true
*      content:
*        application/json:
*         schema:
*             type: object
*             properties:
*               refreshToken:
*                 type: string
*                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImlhdCI6MTczNjkyMzM3NSwiZXhwIjoxNzM3NTI4MTc1fQ.L7lLQqEuj9UZvzpYAZ58wUNEI5cTPLCAYyZviXWSICM"
*   responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.post('/refreshToken', userController.refreshToken)

/**
* @swagger
* /api/users/logoutUser:
*  post:
*   summary: Logout a user
*   tags: [Users]
*   requestBody:
*      required: true
*      content:
*        application/json:
*         schema:
*             type: object
*             properties:
*               refreshToken:
*                 type: string
*                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImlhdCI6MTczNjkyMzM3NSwiZXhwIjoxNzM3NTI4MTc1fQ.L7lLQqEuj9UZvzpYAZ58wUNEI5cTPLCAYyZviXWSICM"
*   responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.post('/logoutUser', userController.logoutUser)



export default router;