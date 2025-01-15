////อ่านแค่ฟังชั่นเดียว
//import getAllProducts from '../services/productService';

import { Request, Response } from 'express';
//เรียกใช้งานฟังชั่นทั้งหมดจากไฟล์ services/productService.ts
import * as productService from '../services/productService';

//อ่านข้อมูลสินค้าทั้งหมด
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

// read product by id
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productService.getProductById(id);
        if (!product) {
            res.status(404).json({
                message: 'Product not found'
            })
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//เพิ่มข้อมูลสินค้า
export const createProduct = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    // const name = req.body.name;
    // const price = req.body.price;
    try {
        const product = await productService.createProduct(name, price);
        res.status(201).json(product);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//แก้ไขข้อมูลสินค้า
export const updateProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    try {
        const product = await productService.updateProduct(id, name, price);
        if (!product) {
            res.status(404).json({
                message: 'Product not found'
            })
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//ลบข้อมูลสินค้า
export const deleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await productService.deleteProduct(id);
        res.status(204).json();
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}