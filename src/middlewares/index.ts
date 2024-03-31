import express from 'express';
import { merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['auth-session-token'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next()
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}
