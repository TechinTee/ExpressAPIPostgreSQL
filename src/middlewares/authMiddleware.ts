import { Request , Response, NextFunction } from 'express';
import * as jwtUtils from '../utils/jwtUtils';

interface IAuthRequest extends Request {
    user?: { userID: number };
}

// export const authenticateJWT = (req: IAuthRequest, res: Response, next: NextFunction): void => {
//     const authHeader = req.header('Authorization');
//     const token = authHeader && authHeader.split(' ')[1];
  
//     if (!token) {
//       res.status(401).json({ message: 'Access Denied' });
//       return;
//     }
  
//     try {
//       const user = jwtUtils.verifyAccessToken(token);
//       if (user) {
//         req.user = user;
//         next();
//       }
//     } catch (err) {
//       res.status(403).json({ message: 'Invalid or expired token' });
//     }
//   };

export const authenticateJWT = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authHeader = (req.headers as any).authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
         res.status(401).json({ message: 'Unauthorized' });
         return
    }

    // ถ้ามี token ให้ทำการตรวจสอบ token ว่าถูกต้องหรือไม่
    try{
        const user = jwtUtils.verifyAccessToken(token);
        if (user) {
            req.user = user as { userID: number };
            next();
        } else {
            res.status(403).json({ message: 'Invalid token' });
            return
        }
    } catch (error) {
            res.status(500).json({ message: 'Invalid or expired token' });
            return
    }
}