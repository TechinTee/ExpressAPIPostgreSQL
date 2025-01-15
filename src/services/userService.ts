import pool from '../utils/db';
import User from '../models/userModel';

interface IUser {
    id: number
    username: string
    password: string
    fullname: string
    email: string
    tel: string
};

// สร้างฟังชั่นสำหรับการลงทะเบียนผู้ใช่ใหม่ โดยสร้างฟังชั่น registerUser
export const registerUser = async (
    username: string, 
    password: string, 
    fullname: string, 
    email: string, 
    tel: string ): Promise<IUser> => {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (username, password, fullname, email, tel) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, password, fullname, email, tel]);
    client.release();

    const row = result.rows[0];
    return new User(
        row.id,
        row.username,
        row.password,
        row.fullname,
        row.email,
        row.tel
    );
}

// สร้างฟังชั่นสำหรับการเข้าสู่ระบบ โดยสร้างฟังชั่น loginUser
export const loginUser = async (username: string): Promise<IUser | null> => {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    client.release();

    if (result.rows.length > 0) {
        const {
            id,
            username,
            password,
            fullname,
            email,
            tel
        } = result.rows[0]
        return new User(
            id,
            username,
            password,
            fullname,
            email,
            tel
        )
    }

    return null;
}