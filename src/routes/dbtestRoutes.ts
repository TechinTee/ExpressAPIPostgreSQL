import Express from "express";
// Import the pool object from the db module
import pool from '../utils/db';

const router = Express.Router();

//Method: GET
// router.get('/', (req, res) => {
//     res.send('Hello World');
// });

// ทดสอบการเชื่อมต่อฐานข้อมูล PostgreSQL
/**
 * @swagger
 * tags:
 *  name: TestDB
 * descrition: test database connection
 */

/**
 * @swagger
 * /api/testdb:
 *  get:
 *      summary: Test database connection
 *      tags: [TestDB]
 *      responses:
 *          200:
 *              description: Connection to the database was successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                             $ref: '#/components/schemas/DBTest'
 */
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.status(200).json({
            message: 'Connection to the database was successful',
            data: result.rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to connect to the database',
            error: error
        });
    }
});

export default router;
