import pool from '../utils/db';
import Product from '../models/productModel';
import { promises } from 'dns';

interface IProduct {
    id: number;
    name: string;
    price: number;
}

// อ่านข้อมูลสินค้าทั้งหมด
export const getAllProducts = async () => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM products');
    client.release();
    return result.rows.map(row => new Product(
        row.id,
        row.name,
        row.price
    ));
}


// read product by id
export const getProductById = async (id: number) => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
    client.release();

    const row = result.rows[0];
    return new Product(
        row.id,
        row.name,
        row.price
    );
}

//เพิ่มข้อมูลสินค้า
export const createProduct = async (name: string, price: number): Promise<IProduct> => {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [name, price]);
    client.release();

    const row = result.rows[0];
    return new Product(
        row.id,
        row.name,
        row.price
    );
}

// แก้ไขข้อมูลสินค้า
export const updateProduct = async (id: number, name: string, price: number) => {
    const client = await pool.connect();
    const result = await client.query('UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, id]);
    client.release();

    const row = result.rows[0];
    return new Product(
        row.id,
        row.name,
        row.price
    );
}

// ลบข้อมูลสินค้า
export const deleteProduct = async (id: number) => {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    client.release();

    if (result.rowCount === 0) {
        throw new Error('Product not found');
    } 
    
    const row = result.rows[0];
    return new Product(
        row.id,
        row.name,
        row.price
    );
}