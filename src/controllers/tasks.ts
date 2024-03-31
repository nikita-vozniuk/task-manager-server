import express from 'express';

import { createTask, getUserTasks } from '../db/tasks';

export const createNewTask = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, dueDate, completed, user } = req.body;

        if (!title || !description || !user) {
            return res.sendStatus(400);
        }

        let taskDueDate;
        if (!dueDate) {
            const currentDate = new Date();
            taskDueDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        } else {
            taskDueDate = new Date(dueDate);
        }

        const task = await createTask({
            title,
            description,
            dueDate: taskDueDate,
            completed,
            user
        });

        return res.status(200).json(task).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllUserTasks = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.body;

        const userTasks = await getUserTasks(userId);
        return res.status(200).json(userTasks).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
