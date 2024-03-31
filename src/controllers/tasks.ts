import express from 'express';

import { getTaskById, createTask, getUserTasks, updateTaskById, deleteTaskById } from '../db/tasks';

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

export const deleteTask = async (req: express.Request, res: express.Response) => {
    try {
        const taskId = req.params.id;

        if (!taskId) {
            return res.sendStatus(400);
        }

        const deletedTask = await deleteTaskById(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' }).end();
        }

        return res.status(200).json(deletedTask).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTask = async (req: express.Request, res: express.Response) => {
    try {
        const taskId = req.params.id;
        const { title, description, dueDate, completed, user } = req.body;

        if (!taskId || (!title && !description && !dueDate && !completed && !user)) {
            return res.sendStatus(400);
        }

        const existingTask = await getTaskById(taskId);

        if (!existingTask) {
            return res.status(404).json({ message: 'Task not found' }).end();
        }

        const updatedValues = {
            title: title || existingTask.title,
            description: description || existingTask.description,
            dueDate: dueDate || existingTask.dueDate,
            completed: completed || existingTask.completed,
            user: user || existingTask.user
        };

        const updatedTask = await updateTaskById(taskId, updatedValues);

        return res.status(200).json(updatedTask).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
