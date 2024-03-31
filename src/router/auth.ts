import express from 'express';

import { register, login, logout, checkIsAuth } from '../controllers/auth';

export default (router: express.Router) => {
    router.post('/auth', checkIsAuth);
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/auth/logout', logout);
}
