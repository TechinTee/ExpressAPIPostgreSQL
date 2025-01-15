import Express from "express";

import * as productController from "../controllers/productController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Express.Router();

//เรียกใช้งานฟังชั่นทั้งหมดจากไฟล์ controllers/productController.ts
/**
* @swagger
* tags:
*  name: Products
*  description: API for managing products
*/
 
/**
* @swagger
* /api/products:
*   get:
*     summary: Get all products
*     tags: [Products]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: List of products
*         content:
*           application/json:
*             schema:
*              type: array
*              items:
*               $ref: '#/components/schemas/Product'
*/
router.get('/', authenticateJWT, productController.getAllProducts)

// read product by id
// routes อ่านข้อมูลสินค้าตาม id
/**
* @swagger
* /api/products/{id}:
*   get:
*     summary: Get a product by ID
*     tags: [Products]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product ID
*     responses:
*       200:
*         description: The product details
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.get('/:id', authenticateJWT, productController.getProductById)

//เพิ่มข้อมูลสินค้า
/**
* @swagger
* /api/products:
*   post:
*     summary: Create a new product
*     tags: [Products]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "iPhone 14"
*               price:
*                 type: number
*                 example: 999.99
*     responses:
*       201:
*         description: Product created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*/
router.post('/', authenticateJWT, productController.createProduct)

//แก้ไขข้อมูลสินค้า
/**
* @swagger
* /api/products/{id}:
*   put:
*     summary: Update an existing product
*     tags: [Products]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "iPhone 14 Pro"
*               price:
*                 type: number
*                 example: 1099.99
*     responses:
*       200:
*         description: Product updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       404:
*         description: Product not found
*/
router.put('/:id', authenticateJWT, productController.updateProduct)

//ลบข้อมูลสินค้า
/**
* @swagger
* /api/products/{id}:
*   delete:
*     summary: Delete a product by ID
*     tags: [Products]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The product ID
*     responses:
*       200:
*         description: Product deleted successfully
*       404:
*         description: Product not found
*/
router.delete('/:id', authenticateJWT, productController.deleteProduct)


export default router;