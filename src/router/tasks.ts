import express from 'express';

import { createNewTask, getAllUserTasks } from '../controllers/tasks';

export default (router: express.Router) => {
    router.post('/tasks', createNewTask);
    router.post('/tasks/user', getAllUserTasks);
}
