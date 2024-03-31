import express from 'express';

import { createNewTask, getAllUserTasks, updateTask, deleteTask } from '../controllers/tasks';

export default (router: express.Router) => {
    router.post('/tasks', createNewTask);
    router.post('/tasks/user', getAllUserTasks);
    router.delete('/tasks/:id', deleteTask);
    router.put('/tasks/:id', updateTask);
}
