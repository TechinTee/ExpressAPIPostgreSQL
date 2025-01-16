import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as userService from '../services/userService';
import * as jwtUtils from '../utils/jwtUtils';

//ฟังชั่นสำหรับการลงทะเบียนผู้ใช่ใหม่
export const registerUser = async (req: Request, res: Response) => {
    const { username, password, fullname, email, tel } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.registerUser(username, hashedPassword, fullname, email, tel);
        res.status(201).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//ฟังชั่นสำหรับการเข้าสู่ระบบ
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await userService.loginUser(username);

        if (!user) {
            res.status(404).json({
                message: 'Invalid username or password'
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({
                message: 'Invalid username or password'
            });
            return;
        }

        const accessToken = jwtUtils.generateAccessToken(user.id);
        const refreshToken = jwtUtils.generateRefreshToken(user.id);

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                tel: user.tel
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}


//สร้างฟังชั่น refresh token
export const refreshToken = async (req: Request & {
    body: { refreshToken: string }
},
    res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400).json({
            message: 'Refresh Token is required'
        });
        return;
    }

    if (!jwtUtils.isRefreshTokenValid(refreshToken)) {
        res.status(403).json({
            message: 'Invalid refresh token'
        });
        return;
    }

    try {
        const decoded = jwtUtils.verifyRefreshToken(refreshToken);
        const userId = decoded?.userID;
        if (!userId) {
            res.status(403).json({
                message: 'Invalid refresh token'
            });
            return;
        }
        const newAccessToken = jwtUtils.generateAccessToken(userId);
        res.status(200).json({
            newAccessToken: newAccessToken
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            message: err.message
        });
    }
}

//สร้างฟังชั่นสำหรับการออกจากระบบ
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400).json({
            message: 'Refresh Token is required'
        });
        return;
    }

    jwtUtils.revokeRefreshToken(refreshToken);
    res.status(200).json({
        message: 'User Logout successfully'
    });
}